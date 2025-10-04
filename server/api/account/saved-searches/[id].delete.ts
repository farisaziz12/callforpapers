import { serverSupabaseUser } from '#supabase/server'
import { getSavedSearches } from '../../../adapters/container'
import { createNotFoundResponse } from '../../../lib/response'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    return createNotFoundResponse('Saved search ID is required')
  }

  const savedSearches = getSavedSearches(event)

  try {
    await savedSearches.delete(id, user.sub)
    return { success: true, message: 'Saved search deleted successfully' }
  } catch (error: any) {
    return createNotFoundResponse(error.message)
  }
})
