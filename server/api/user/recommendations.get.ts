import { serverSupabaseUser } from '#supabase/server'
import { getSupabaseClient } from '../../lib/supabase'
import type { UserRecommendationDTO } from '../../../packages/schemas/dto'

/**
 * Generate personalized CFP recommendations based on:
 * - User's preferred topics
 * - User's preferred formats
 * - Past submissions
 * - CFPs closing soon
 */
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const supabase = await getSupabaseClient(event)

  // Get user profile for preferences
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('preferred_topics, preferred_formats')
    .eq('id', user.sub)
    .single()

  // Get user's past submissions to avoid recommending already applied CFPs
  const { data: submissions } = await supabase
    .from('user_submissions')
    .select('cfp_id')
    .eq('user_id', user.sub)

  const appliedCfpIds = submissions?.map(s => s.cfp_id) || []

  // Build query for recommendations
  let query = supabase
    .from('cfps')
    .select('*')
    .gte('closes_at', new Date().toISOString()) // Only future CFPs

  // Exclude already applied CFPs
  if (appliedCfpIds.length > 0) {
    query = query.not('id', 'in', `(${appliedCfpIds.join(',')})`)
  }

  const { data: cfps } = await query.limit(50)

  if (!cfps || cfps.length === 0) {
    return []
  }

  // Score each CFP
  const recommendations: UserRecommendationDTO[] = cfps.map(cfp => {
    let score = 0
    const reasons: string[] = []

    // Topic matching (40 points max)
    if (profile?.preferred_topics && profile.preferred_topics.length > 0) {
      const matchingTopics = cfp.topics.filter(t =>
        profile.preferred_topics.includes(t)
      )
      if (matchingTopics.length > 0) {
        const topicScore = Math.min(40, matchingTopics.length * 15)
        score += topicScore
        reasons.push(`Matches ${matchingTopics.length} of your preferred topics`)
      }
    }

    // Format matching (20 points)
    if (profile?.preferred_formats && profile.preferred_formats.includes(cfp.format)) {
      score += 20
      reasons.push('Matches your preferred format')
    }

    // Deadline urgency (20 points max - higher for sooner deadlines)
    const daysUntilDeadline = Math.ceil(
      (new Date(cfp.closes_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
    if (daysUntilDeadline <= 7) {
      score += 20
      reasons.push('Closing this week')
    } else if (daysUntilDeadline <= 30) {
      score += 10
      reasons.push('Closing soon')
    }

    // Perks (20 points max)
    let perkPoints = 0
    if (cfp.perks_travel) {
      perkPoints += 7
      reasons.push('Travel covered')
    }
    if (cfp.perks_hotel) {
      perkPoints += 7
      reasons.push('Hotel covered')
    }
    if (cfp.perks_honorarium) {
      perkPoints += 6
      reasons.push('Honorarium offered')
    }
    score += perkPoints

    return {
      id: cfp.id,
      userId: user.sub,
      cfpId: cfp.id,
      score: Math.min(100, score), // Cap at 100
      reasons,
      createdAt: new Date().toISOString(),
      cfp: {
        id: cfp.id,
        slug: cfp.slug,
        title: cfp.title,
        city: cfp.city,
        country: cfp.country,
        topics: cfp.topics,
        closesAt: cfp.closes_at,
        format: cfp.format,
        perks: {
          travel: cfp.perks_travel,
          hotel: cfp.perks_hotel,
          honorarium: cfp.perks_honorarium
        },
        lastUpdatedAt: cfp.last_updated_at
      }
    }
  })

  // Sort by score (highest first) and return top 10
  return recommendations
    .sort((a, b) => b.score - a.score)
    .filter(r => r.score > 0) // Only return recommendations with some relevance
    .slice(0, 10)
})
