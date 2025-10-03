import { getSavedSearches, getAuth } from '../../adapters/container'

export default defineEventHandler(async (event) => {
  const auth = getAuth()
  const user = await auth.getCurrentUser(event)

  const savedSearches = getSavedSearches(event)
  const searches = await savedSearches.list(user.sub)

  return searches
})