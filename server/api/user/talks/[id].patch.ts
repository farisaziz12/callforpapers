import { serverSupabaseUser } from '#supabase/server'
import { getSupabaseClient } from '../../../lib/supabase'
import { updateTalkSchema } from '../../../../packages/schemas/zod'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const validatedData = updateTalkSchema.parse(body)

  const supabase = await getSupabaseClient(event)

  // Build update object
  const updateData: any = {}
  if (validatedData.title !== undefined) updateData.title = validatedData.title
  if (validatedData.abstract !== undefined) updateData.abstract = validatedData.abstract
  if (validatedData.description !== undefined) updateData.description = validatedData.description
  if (validatedData.topics !== undefined) updateData.topics = validatedData.topics
  if (validatedData.durationMinutes !== undefined) updateData.duration_minutes = validatedData.durationMinutes
  if (validatedData.slidesUrl !== undefined) updateData.slides_url = validatedData.slidesUrl || null
  if (validatedData.videoUrl !== undefined) updateData.video_url = validatedData.videoUrl || null
  if (validatedData.githubUrl !== undefined) updateData.github_url = validatedData.githubUrl || null

  // Update talk
  const { data, error } = await supabase
    .from('user_talks')
    .update(updateData)
    .eq('id', id)
    .eq('user_id', user.sub)
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to update talk: ${error.message}`
    })
  }

  if (!data) {
    throw createError({
      statusCode: 404,
      message: 'Talk not found'
    })
  }

  return {
    success: true,
    message: 'Talk updated successfully'
  }
})
