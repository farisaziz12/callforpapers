import { serverSupabaseUser } from '#supabase/server'
import { getSupabaseClient } from '../../lib/supabase'
import { createTalkSchema } from '../../../packages/schemas/zod'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const body = await readBody(event)
  const validatedData = createTalkSchema.parse(body)

  const supabase = await getSupabaseClient(event)

  // Insert talk
  const { data, error } = await supabase
    .from('user_talks')
    .insert({
      user_id: user.sub,
      title: validatedData.title,
      abstract: validatedData.abstract,
      description: validatedData.description,
      topics: validatedData.topics,
      duration_minutes: validatedData.durationMinutes,
      slides_url: validatedData.slidesUrl || null,
      video_url: validatedData.videoUrl || null,
      github_url: validatedData.githubUrl || null
    })
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to create talk: ${error.message}`
    })
  }

  return {
    id: data.id,
    success: true,
    message: 'Talk added to library successfully'
  }
})
