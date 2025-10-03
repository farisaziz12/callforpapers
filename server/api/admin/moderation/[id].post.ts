import { getCfpDirectory } from '../../../adapters/container'
import { createNotFoundResponse } from '../../../lib/response'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    return createNotFoundResponse('Moderation item ID is required')
  }

  const directory = getCfpDirectory(event)

  try {
    await directory.approveModeration(id)
    return { success: true, message: 'CFP approved and published' }
  } catch (error: any) {
    return createNotFoundResponse(error.message)
  }
})