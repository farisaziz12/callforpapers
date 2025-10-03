import { getCfpDirectory } from '../../adapters/container'
import { createNotFoundResponse } from '../../lib/response'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    return createNotFoundResponse('CFP slug is required')
  }

  const directory = getCfpDirectory(event)
  const cfp = await directory.getBySlug(slug)

  if (!cfp) {
    return createNotFoundResponse('CFP not found')
  }

  return cfp
})