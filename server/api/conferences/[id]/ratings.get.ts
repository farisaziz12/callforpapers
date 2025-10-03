import { getSupabaseClient } from '../../../lib/supabase'
import type { ConferenceRatingDTO } from '../../../../packages/schemas/dto'

export default defineEventHandler(async (event) => {
  const cfpId = getRouterParam(event, 'id')
  const supabase = await getSupabaseClient(event)

  // Fetch all ratings for this CFP with user info
  const { data, error } = await supabase
    .from('conference_ratings')
    .select(`
      *,
      user:user_profiles!conference_ratings_user_id_fkey (
        full_name,
        avatar_url
      )
    `)
    .eq('cfp_id', cfpId)
    .order('created_at', { ascending: false })

  if (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to fetch ratings: ${error.message}`
    })
  }

  // Map to DTOs
  const ratings: ConferenceRatingDTO[] = (data || []).map((rating: any) => ({
    id: rating.id,
    userId: rating.user_id,
    cfpId: rating.cfp_id,
    rating: rating.rating,
    reviewTitle: rating.review_title || undefined,
    reviewText: rating.review_text || undefined,
    wouldRecommend: rating.would_recommend ?? true,
    organizerResponsiveness: rating.organizer_responsiveness || undefined,
    speakerExperience: rating.speaker_experience || undefined,
    createdAt: rating.created_at,
    updatedAt: rating.updated_at,
    user: rating.user ? {
      fullName: rating.user.full_name || undefined,
      avatarUrl: rating.user.avatar_url || undefined
    } : undefined
  }))

  return ratings
})
