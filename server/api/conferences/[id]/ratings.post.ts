import { serverSupabaseUser } from '#supabase/server'
import { getSupabaseClient } from '../../../lib/supabase'
import { createRatingSchema } from '../../../../packages/schemas/zod'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized - please sign in to leave a rating'
    })
  }

  const cfpId = getRouterParam(event, 'id')
  const body = await readBody(event)

  // Ensure cfpId matches route param
  const validatedData = createRatingSchema.parse({ ...body, cfpId })

  const supabase = await getSupabaseClient(event)

  // Insert rating
  const { data, error } = await supabase
    .from('conference_ratings')
    .insert({
      user_id: user.sub,
      cfp_id: validatedData.cfpId,
      rating: validatedData.rating,
      review_title: validatedData.reviewTitle,
      review_text: validatedData.reviewText,
      would_recommend: validatedData.wouldRecommend,
      organizer_responsiveness: validatedData.organizerResponsiveness,
      speaker_experience: validatedData.speakerExperience
    })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') { // Unique violation
      throw createError({
        statusCode: 409,
        message: 'You have already rated this conference. Please update your existing rating.'
      })
    }
    throw createError({
      statusCode: 500,
      message: `Failed to create rating: ${error.message}`
    })
  }

  return {
    id: data.id,
    success: true,
    message: 'Rating submitted successfully'
  }
})
