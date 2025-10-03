import { getCfpDirectory } from '../../adapters/container'

export default defineEventHandler(async (event) => {
  const directory = getCfpDirectory(event)
  const items = await directory.listModeration()

  return { items }
})