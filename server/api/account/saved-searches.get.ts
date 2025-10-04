import { serverSupabaseUser } from '#supabase/server'
import { getSavedSearches } from '../../adapters/container'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const savedSearches = getSavedSearches(event)
  const searches = await savedSearches.list(user.sub)

  return searches
})