import type { SavedSearchDTO, SearchParams } from '../../../packages/schemas/dto'

export interface ISavedSearches {
  list(userId: string): Promise<SavedSearchDTO[]>
  create(userId: string, dto: { name: string; filters: SearchParams }): Promise<void>
  delete(id: string, userId: string): Promise<void>
}