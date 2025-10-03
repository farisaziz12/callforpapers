import { getCfpDirectory } from '../../../adapters/container'
import { createNotFoundResponse } from '../../../lib/response'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    return createNotFoundResponse('CFP ID is required')
  }

  const directory = getCfpDirectory(event)

  try {
    await directory.deleteCfp(id)
    return { success: true, message: 'CFP deleted successfully' }
  } catch (error: any) {
    return createNotFoundResponse(error.message)
  }
})
