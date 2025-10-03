import { serverSupabaseUser } from '#supabase/server'
import { getSupabaseClient } from '../../../lib/supabase'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const id = getRouterParam(event, 'id')
  const supabase = await getSupabaseClient(event)

  // Delete submission
  const { error } = await supabase
    .from('user_submissions')
    .delete()
    .eq('id', id)
    .eq('user_id', user.sub)

  if (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to delete submission: ${error.message}`
    })
  }

  return {
    success: true,
    message: 'Submission deleted successfully'
  }
})
