import { serverSupabaseUser } from '#supabase/server'
import { getSavedSearches } from '../../adapters/container'
import { validateBody } from '../../lib/validate'
import { savedSearchSchema } from '../../../packages/schemas/zod'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const payload = await validateBody(event, savedSearchSchema)
  const savedSearches = getSavedSearches(event)

  await savedSearches.create(user.sub, payload.name, payload.filters)

  return { success: true }
})