import { serverSupabaseUser } from '#supabase/server'
import { getSupabaseClient } from '../../lib/supabase'
import { createSubmissionSchema } from '../../../packages/schemas/zod'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const body = await readBody(event)
  const validatedData = createSubmissionSchema.parse(body)

  const supabase = await getSupabaseClient(event)

  // Insert submission
  const { data, error } = await supabase
    .from('user_submissions')
    .insert({
      user_id: user.sub,
      cfp_id: validatedData.cfpId,
      status: validatedData.status,
      talk_title: validatedData.talkTitle,
      talk_abstract: validatedData.talkAbstract,
      applied_at: validatedData.appliedAt,
      notes: validatedData.notes
    })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') { // Unique violation
      throw createError({
        statusCode: 409,
        message: 'You have already tracked this CFP'
      })
    }
    throw createError({
      statusCode: 500,
      message: `Failed to create submission: ${error.message}`
    })
  }

  return {
    id: data.id,
    success: true,
    message: 'Submission tracked successfully'
  }
})
