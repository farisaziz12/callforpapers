import { serverSupabaseUser } from '#supabase/server'
import { getSupabaseClient } from '../../lib/supabase'
import type { UserProfileDTO } from '../../../packages/schemas/dto'

export default defineEventHandler(async (event) => {
  // Get authenticated user
  const user = await serverSupabaseUser(event)
  console.log('user', user)
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const supabase = await getSupabaseClient(event)

  // Fetch user profile
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.sub)
    .maybeSingle()

  if (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to fetch user profile: ${error.message}`
    })
  }

  // If profile doesn't exist, create one
  if (!data) {
    const { data: newProfile, error: createError } = await supabase
      .from('user_profiles')
      .insert({
        id: user.sub,
        email: user.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (createError || !newProfile) {
      throw createError({
        statusCode: 500,
        message: 'Failed to create user profile'
      })
    }

    // Return newly created profile
    const profile: UserProfileDTO = {
      id: newProfile.id,
      email: newProfile.email,
      fullName: undefined,
      bio: undefined,
      avatarUrl: undefined,
      websiteUrl: undefined,
      twitterHandle: undefined,
      linkedinUrl: undefined,
      githubUrl: undefined,
      speakingExperience: undefined,
      preferredTopics: [],
      preferredFormats: [],
      willingToTravel: true,
      availableForSpeaking: true,
      createdAt: newProfile.created_at,
      updatedAt: newProfile.updated_at
    }

    return profile
  }

  // Map to DTO
  const profile: UserProfileDTO = {
    id: data.id,
    email: data.email,
    fullName: data.full_name || undefined,
    bio: data.bio || undefined,
    avatarUrl: data.avatar_url || undefined,
    websiteUrl: data.website_url || undefined,
    twitterHandle: data.twitter_handle || undefined,
    linkedinUrl: data.linkedin_url || undefined,
    githubUrl: data.github_url || undefined,
    speakingExperience: data.speaking_experience || undefined,
    preferredTopics: data.preferred_topics || [],
    preferredFormats: data.preferred_formats || [],
    willingToTravel: data.willing_to_travel ?? true,
    availableForSpeaking: data.available_for_speaking ?? true,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }

  return profile
})
