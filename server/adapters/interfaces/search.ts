import type { CfpCardDTO, SearchParams } from '../../../packages/schemas/dto'
import type { H3Event } from 'h3'

export interface ISearch {
  search(event: H3Event, params: SearchParams): Promise<{ hits: CfpCardDTO[]; total: number }>
}