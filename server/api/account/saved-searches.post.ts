import { getSavedSearches, getAuth } from '../../adapters/container'
import { validateBody } from '../../lib/validate'
import { savedSearchSchema } from '../../../packages/schemas/zod'

export default defineEventHandler(async (event) => {
  const auth = getAuth()
  const user = await auth.getCurrentUser(event)

  const payload = await validateBody(event, savedSearchSchema)
  const savedSearches = getSavedSearches(event)

  await savedSearches.create(user.id, payload)

  return { success: true }
})