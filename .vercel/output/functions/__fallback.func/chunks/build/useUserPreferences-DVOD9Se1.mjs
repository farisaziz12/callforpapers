import { ref, readonly } from 'vue';

const useUserPreferences = () => {
  const preferences = ref({
    countries: [],
    topics: [],
    formats: [],
    savedSearches: []
  });
  const setCountries = (countries) => {
    preferences.value.countries = countries;
  };
  const setTopics = (topics) => {
    preferences.value.topics = topics;
  };
  const setFormats = (formats) => {
    preferences.value.formats = formats;
  };
  const addSavedSearch = (name, filters) => {
    const savedSearch = {
      id: crypto.randomUUID(),
      name,
      filters,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    preferences.value.savedSearches.push(savedSearch);
    return savedSearch;
  };
  const removeSavedSearch = (id) => {
    preferences.value.savedSearches = preferences.value.savedSearches.filter(
      (search) => search.id !== id
    );
  };
  const updateSavedSearch = (id, name, filters) => {
    const index = preferences.value.savedSearches.findIndex((search) => search.id === id);
    if (index !== -1) {
      preferences.value.savedSearches[index] = {
        ...preferences.value.savedSearches[index],
        name,
        filters
      };
    }
  };
  const matchesPreferences = (filters) => {
    if (preferences.value.countries.length > 0 && filters.country) {
      return preferences.value.countries.includes(filters.country);
    }
    if (preferences.value.topics.length > 0 && filters.topic) {
      return preferences.value.topics.includes(filters.topic);
    }
    if (preferences.value.formats.length > 0 && filters.format) {
      return preferences.value.formats.includes(filters.format);
    }
    return true;
  };
  return {
    preferences: readonly(preferences),
    setCountries,
    setTopics,
    setFormats,
    addSavedSearch,
    removeSavedSearch,
    updateSavedSearch,
    matchesPreferences
  };
};

export { useUserPreferences as u };
//# sourceMappingURL=useUserPreferences-DVOD9Se1.mjs.map
