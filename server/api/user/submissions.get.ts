import { serverSupabaseUser } from '#supabase/server'
import { getSupabaseClient } from '../../lib/supabase'
import type { UserSubmissionDTO } from '../../../packages/schemas/dto'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const supabase = await getSupabaseClient(event)

  // Fetch submissions with CFP data
  const { data, error } = await supabase
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

  if (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to fetch submissions: ${error.message}`
    })
  }

  // Map to DTOs
  const submissions: UserSubmissionDTO[] = (data || []).map((sub: any) => ({
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
  }))

  return submissions
})
