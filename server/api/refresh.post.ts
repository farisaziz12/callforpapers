import { getCfpDirectory, getAuth } from '../adapters/container'
import { createForbiddenResponse } from '../lib/response'

export default defineEventHandler(async (event) => {
  const auth = getAuth()
  const user = await auth.getCurrentUser(event)

  if (user.role !== 'admin') {
    return createForbiddenResponse('Admin access required')
  }

  const directory = getCfpDirectory(event)
  await directory.refresh()

  return {
    success: true,
    message: 'Data refreshed successfully'
  }
})