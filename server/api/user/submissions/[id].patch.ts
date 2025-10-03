import { serverSupabaseUser } from '#supabase/server'
import { getSupabaseClient } from '../../../lib/supabase'
import { updateSubmissionSchema } from '../../../../packages/schemas/zod'

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
  const validatedData = updateSubmissionSchema.parse(body)

  const supabase = await getSupabaseClient(event)

  // Build update object
  const updateData: any = {}
  if (validatedData.status !== undefined) updateData.status = validatedData.status
  if (validatedData.talkTitle !== undefined) updateData.talk_title = validatedData.talkTitle
  if (validatedData.talkAbstract !== undefined) updateData.talk_abstract = validatedData.talkAbstract
  if (validatedData.appliedAt !== undefined) updateData.applied_at = validatedData.appliedAt
  if (validatedData.responseReceivedAt !== undefined) updateData.response_received_at = validatedData.responseReceivedAt
  if (validatedData.notes !== undefined) updateData.notes = validatedData.notes

  // Update submission
  const { data, error } = await supabase
    .from('user_submissions')
    .update(updateData)
    .eq('id', id)
    .eq('user_id', user.sub) // Ensure user owns this submission
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to update submission: ${error.message}`
    })
  }

  if (!data) {
    throw createError({
      statusCode: 404,
      message: 'Submission not found'
    })
  }

  return {
    success: true,
    message: 'Submission updated successfully'
  }
})
