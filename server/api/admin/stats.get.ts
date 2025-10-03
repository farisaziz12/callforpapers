import { getCfpDirectory } from '../../adapters/container'

export default defineEventHandler(async (event) => {
  const directory = getCfpDirectory(event)

  const stats = await directory.getStats()

  return stats
})
