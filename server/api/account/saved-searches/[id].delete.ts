import { getSavedSearches, getAuth } from '../../../adapters/container'
import { createNotFoundResponse } from '../../../lib/response'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    return createNotFoundResponse('Saved search ID is required')
  }

  const auth = getAuth()
  const user = await auth.getCurrentUser(event)

  const savedSearches = getSavedSearches(event)

  try {
    await savedSearches.delete(id, user.id)
    return { success: true, message: 'Saved search deleted successfully' }
  } catch (error: any) {
    return createNotFoundResponse(error.message)
  }
})
