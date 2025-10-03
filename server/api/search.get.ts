import { getSearch } from '../adapters/container'
import { validateQuery } from '../lib/validate'
import { searchParamsSchema } from '../../packages/schemas/zod'

export default defineEventHandler(async (event) => {

  console.log('search.get',
    {
      query: getQuery(event),
      params: searchParamsSchema.parse(getQuery(event))
    }
  )
  const params = validateQuery(event, searchParamsSchema)
  const search = getSearch()

  const result = await search.search(event, params)

  return {
    items: result.hits,
    total: result.total,
    page: params.page,
    pageSize: params.pageSize
  }
})