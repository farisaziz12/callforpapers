import type { ISavedSearches } from '../interfaces/saved-searches'
import type { SavedSearchDTO, SearchParams } from '../../../packages/schemas/dto'
import type { Database } from '../../lib/database.types'
import type { H3Event } from 'h3'
import { getSupabaseClient } from '../../lib/supabase'

type DbSavedSearch = Database['public']['Tables']['saved_searches']['Row']
type DbSavedSearchInsert = Database['public']['Tables']['saved_searches']['Insert']

function dbSavedSearchToDTO(dbSavedSearch: DbSavedSearch): SavedSearchDTO {
  const filters: SearchParams = {
    q: dbSavedSearch.filter_query ?? undefined,
    country: dbSavedSearch.filter_country ?? undefined,
    topic: dbSavedSearch.filter_topic ?? undefined,
    format: dbSavedSearch.filter_format ?? undefined,
    closesBefore: dbSavedSearch.filter_closes_before ?? undefined,
  }

  return {
    id: dbSavedSearch.id,
    name: dbSavedSearch.name,
    filters,
  }
}

export class SupabaseSavedSearches implements ISavedSearches {
  constructor(private event: H3Event) {}

  async list(userId: string): Promise<SavedSearchDTO[]> {
    const supabase = await getSupabaseClient(this.event)
    const { data, error } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch saved searches: ${error.message}`)
    }

    return (data || []).map(dbSavedSearchToDTO)
  }

  async create(userId: string, name: string, filters: SearchParams): Promise<SavedSearchDTO> {
    const supabase = await getSupabaseClient(this.event)
    const insert: DbSavedSearchInsert = {
      user_id: userId,
      name,
      filter_query: filters.q || null,
      filter_country: filters.country || null,
      filter_topic: filters.topic || null,
      filter_format: filters.format || null,
      filter_closes_before: filters.closesBefore || null,
    }

    const { data, error } = await supabase
      .from('saved_searches')
      .insert(insert)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create saved search: ${error.message}`)
    }

    return dbSavedSearchToDTO(data)
  }

  async delete(id: string, userId: string): Promise<void> {
    const supabase = await getSupabaseClient(this.event)
    const { error } = await supabase
      .from('saved_searches')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) {
      throw new Error(`Failed to delete saved search: ${error.message}`)
    }
  }
}
