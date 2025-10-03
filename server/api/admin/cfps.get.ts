import { getCfpDirectory } from '../../adapters/container'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const pageSize = Number(query.pageSize) || 20

  const directory = getCfpDirectory(event)
  const result = await directory.list({ page, pageSize })

  return result
})
