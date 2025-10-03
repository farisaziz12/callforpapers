import { serverSupabaseUser } from '#supabase/server'
import { getSupabaseClient } from '../../lib/supabase'
import { userProfileSchema } from '../../../packages/schemas/zod'

export default defineEventHandler(async (event) => {
  // Get authenticated user
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  // Parse and validate request body
  const body = await readBody(event)
  const validatedData = userProfileSchema.parse(body)

  const supabase = await getSupabaseClient(event)

  // Update user profile
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      full_name: validatedData.fullName,
      bio: validatedData.bio,
      avatar_url: validatedData.avatarUrl || null,
      website_url: validatedData.websiteUrl || null,
      twitter_handle: validatedData.twitterHandle,
      linkedin_url: validatedData.linkedinUrl || null,
      github_url: validatedData.githubUrl || null,
      speaking_experience: validatedData.speakingExperience,
      preferred_topics: validatedData.preferredTopics,
      preferred_formats: validatedData.preferredFormats,
      willing_to_travel: validatedData.willingToTravel,
      available_for_speaking: validatedData.availableForSpeaking
    })
    .eq('id', user.sub)
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to update profile: ${error.message}`
    })
  }

  return {
    success: true,
    message: 'Profile updated successfully'
  }
})
