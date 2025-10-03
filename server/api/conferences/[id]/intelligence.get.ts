import { getSupabaseClient } from '../../../lib/supabase'
import type { ConferenceMetadataDTO } from '../../../../packages/schemas/dto'

export default defineEventHandler(async (event) => {
  const cfpId = getRouterParam(event, 'id')
  const supabase = await getSupabaseClient(event)

  // Fetch metadata
  const { data: metadata, error: metadataError } = await supabase
    .from('conference_metadata')
    .select('*')
    .eq('cfp_id', cfpId)
    .single()

  // Calculate average rating and count
  const { data: ratingStats } = await supabase
    .from('conference_ratings')
    .select('rating')
    .eq('cfp_id', cfpId)

  const totalRatings = ratingStats?.length || 0
  const averageRating = totalRatings > 0
    ? ratingStats!.reduce((sum, r) => sum + r.rating, 0) / totalRatings
    : undefined

  // If no metadata exists, create a minimal one
  if (metadataError || !metadata) {
    const result: ConferenceMetadataDTO = {
      id: '',
      cfpId,
      totalSpeakersCount: 0,
      hasCodeOfConduct: false,
      hasDiversityInitiative: false,
      recordsTalks: false,
      providesSlidesPlatform: false,
      verified: false,
      averageRating,
      totalRatings
    }
    return result
  }

  // Map to DTO
  const result: ConferenceMetadataDTO = {
    id: metadata.id,
    cfpId: metadata.cfp_id,
    totalSpeakersCount: metadata.total_speakers_count || 0,
    estimatedAcceptanceRate: metadata.estimated_acceptance_rate || undefined,
    averageResponseTimeDays: metadata.average_response_time_days || undefined,
    attendeeCount: metadata.attendee_count || undefined,
    conferenceSize: metadata.conference_size || undefined,
    hasCodeOfConduct: metadata.has_code_of_conduct ?? false,
    hasDiversityInitiative: metadata.has_diversity_initiative ?? false,
    recordsTalks: metadata.records_talks ?? false,
    providesSlidesPlatform: metadata.provides_slides_platform ?? false,
    previousYearsData: metadata.previous_years_data || undefined,
    verified: metadata.verified ?? false,
    averageRating,
    totalRatings
  }

  return result
})
