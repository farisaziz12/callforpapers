import type { ISavedSearches } from '../interfaces/saved-searches'
import type { SavedSearchDTO, SearchParams } from '../../../packages/schemas/dto'

const savedSearches: Map<string, SavedSearchDTO[]> = new Map()

export class MockSavedSearches implements ISavedSearches {
  async list(userId: string): Promise<SavedSearchDTO[]> {
    return savedSearches.get(userId) || []
  }

  async create(userId: string, dto: { name: string; filters: SearchParams }): Promise<void> {
    const userSearches = savedSearches.get(userId) || []
    const newSearch: SavedSearchDTO = {
      id: String(Date.now()),
      name: dto.name,
      filters: dto.filters
    }
    userSearches.push(newSearch)
    savedSearches.set(userId, userSearches)
  }
}