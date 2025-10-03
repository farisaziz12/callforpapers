import { getCfpDirectory } from '../../../adapters/container'
import { createNotFoundResponse } from '../../../lib/response'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    return createNotFoundResponse('CFP ID is required')
  }

  const body = await readBody(event)
  const directory = getCfpDirectory(event)

  try {
    await directory.updateCfp(id, body)
    return { success: true, message: 'CFP updated successfully' }
  } catch (error: any) {
    return createNotFoundResponse(error.message)
  }
})
