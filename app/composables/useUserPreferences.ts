import type { SearchParams } from '~/packages/schemas/dto'

export interface UserPreferences {
  countries: string[]
  topics: string[]
  formats: string[]
  savedSearches: SavedSearch[]
}

export interface SavedSearch {
  id: string
  name: string
  filters: SearchParams
  createdAt: string
}

const STORAGE_KEY = 'cfp-user-preferences'

export const useUserPreferences = () => {
  const preferences = ref<UserPreferences>({
    countries: [],
    topics: [],
    formats: [],
    savedSearches: []
  })

  // Load preferences from localStorage
  const loadPreferences = () => {
    if (process.client) {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          preferences.value = JSON.parse(stored)
        } catch (e) {
          console.error('Failed to load preferences:', e)
        }
      }
    }
  }

  // Save preferences to localStorage
  const savePreferences = () => {
    if (process.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences.value))
    }
  }

  // Update countries
  const setCountries = (countries: string[]) => {
    preferences.value.countries = countries
    savePreferences()
  }

  // Update topics
  const setTopics = (topics: string[]) => {
    preferences.value.topics = topics
    savePreferences()
  }

  // Update formats
  const setFormats = (formats: string[]) => {
    preferences.value.formats = formats
    savePreferences()
  }

  // Add a saved search
  const addSavedSearch = (name: string, filters: SearchParams) => {
    const savedSearch: SavedSearch = {
      id: crypto.randomUUID(),
      name,
      filters,
      createdAt: new Date().toISOString()
    }
    preferences.value.savedSearches.push(savedSearch)
    savePreferences()
    return savedSearch
  }

  // Remove a saved search
  const removeSavedSearch = (id: string) => {
    preferences.value.savedSearches = preferences.value.savedSearches.filter(
      search => search.id !== id
    )
    savePreferences()
  }

  // Update a saved search
  const updateSavedSearch = (id: string, name: string, filters: SearchParams) => {
    const index = preferences.value.savedSearches.findIndex(search => search.id === id)
    if (index !== -1) {
      preferences.value.savedSearches[index] = {
        ...preferences.value.savedSearches[index],
        name,
        filters
      }
      savePreferences()
    }
  }

  // Check if filters match preferences
  const matchesPreferences = (filters: SearchParams): boolean => {
    if (preferences.value.countries.length > 0 && filters.country) {
      return preferences.value.countries.includes(filters.country)
    }
    if (preferences.value.topics.length > 0 && filters.topic) {
      return preferences.value.topics.includes(filters.topic)
    }
    if (preferences.value.formats.length > 0 && filters.format) {
      return preferences.value.formats.includes(filters.format)
    }
    return true
  }

  // Initialize on mount
  onMounted(() => {
    loadPreferences()
  })

  return {
    preferences: readonly(preferences),
    setCountries,
    setTopics,
    setFormats,
    addSavedSearch,
    removeSavedSearch,
    updateSavedSearch,
    matchesPreferences
  }
}
