import { serverSupabaseUser } from '#supabase/server'
import { getSupabaseClient } from '../../lib/supabase'
import type { DashboardSummaryDTO } from '../../../packages/schemas/dto'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const supabase = await getSupabaseClient(event)

  // Fetch user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.sub)
    .single()

  if (!profile) {
    throw createError({
      statusCode: 404,
      message: 'User profile not found'
    })
  }

  // Get submission stats
  const { count: totalSubmissions } = await supabase
    .from('user_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.sub)

  const { count: acceptedSubmissions } = await supabase
    .from('user_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.sub)
    .eq('status', 'accepted')

  const { count: pendingSubmissions } = await supabase
    .from('user_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.sub)
    .in('status', ['applied', 'interested'])

  const { count: savedSearches } = await supabase
    .from('saved_searches')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.sub)

  // Get recent submissions with CFP data
  const { data: recentSubmissions } = await supabase
    .from('user_submissions')
    .select(`
      *,
      cfp:cfps (
        id,
        slug,
        title,
        city,
        country,
        topics,
        closes_at,
        format,
        perks_travel,
        perks_hotel,
        perks_honorarium,
        last_updated_at
      )
    `)
    .eq('user_id', user.sub)
    .order('created_at', { ascending: false })
    .limit(5)

  // Get CFPs closing this week
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)

  const { data: closingThisWeek } = await supabase
    .from('cfps')
    .select('*')
    .gte('closes_at', new Date().toISOString())
    .lte('closes_at', nextWeek.toISOString())
    .order('closes_at', { ascending: true })
    .limit(6)

  // Build dashboard response
  const dashboard: DashboardSummaryDTO = {
    user: {
      id: profile.id,
      email: profile.email,
      fullName: profile.full_name || undefined,
      bio: profile.bio || undefined,
      avatarUrl: profile.avatar_url || undefined,
      websiteUrl: profile.website_url || undefined,
      twitterHandle: profile.twitter_handle || undefined,
      linkedinUrl: profile.linkedin_url || undefined,
      githubUrl: profile.github_url || undefined,
      speakingExperience: profile.speaking_experience || undefined,
      preferredTopics: profile.preferred_topics || [],
      preferredFormats: profile.preferred_formats || [],
      willingToTravel: profile.willing_to_travel ?? true,
      availableForSpeaking: profile.available_for_speaking ?? true,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at
    },
    stats: {
      totalSubmissions: totalSubmissions || 0,
      acceptedSubmissions: acceptedSubmissions || 0,
      pendingSubmissions: pendingSubmissions || 0,
      savedSearches: savedSearches || 0,
      savedCfps: totalSubmissions || 0 // Using submissions as saved CFPs for now
    },
    recentSubmissions: (recentSubmissions || []).map((sub: any) => ({
      id: sub.id,
      userId: sub.user_id,
      cfpId: sub.cfp_id,
      status: sub.status,
      talkTitle: sub.talk_title || undefined,
      talkAbstract: sub.talk_abstract || undefined,
      appliedAt: sub.applied_at || undefined,
      responseReceivedAt: sub.response_received_at || undefined,
      notes: sub.notes || undefined,
      createdAt: sub.created_at,
      updatedAt: sub.updated_at,
      cfp: sub.cfp ? {
        id: sub.cfp.id,
        slug: sub.cfp.slug,
        title: sub.cfp.title,
        city: sub.cfp.city,
        country: sub.cfp.country,
        topics: sub.cfp.topics,
        closesAt: sub.cfp.closes_at,
        format: sub.cfp.format,
        perks: {
          travel: sub.cfp.perks_travel,
          hotel: sub.cfp.perks_hotel,
          honorarium: sub.cfp.perks_honorarium
        },
        lastUpdatedAt: sub.cfp.last_updated_at
      } : undefined
    })),
    recommendations: [], // Will be populated separately
    closingThisWeek: (closingThisWeek || []).map((cfp: any) => ({
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
    }))
  }

  return dashboard
})
