import type { ISearch } from '../interfaces/search'
import type { CfpCardDTO, SearchParams } from '../../../packages/schemas/dto'
import type { H3Event } from 'h3'
import { getCfpDirectory } from '../container'

export class MockSearch implements ISearch {
  async search(event: H3Event, params: SearchParams): Promise<{ hits: CfpCardDTO[]; total: number }> {
    const directory = getCfpDirectory(event)
    const result = await directory.list(params)

    return {
      hits: result.items,
      total: result.total
    }
  }
}