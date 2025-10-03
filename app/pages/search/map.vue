<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Browse by Country
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Explore conferences and events happening around the world
      </p>
    </div>

    <!-- Search -->
    <div class="mb-8">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass"
        placeholder="Search countries..."
        size="lg"
        class="max-w-md"
      />
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <USkeleton v-for="i in 12" :key="i" class="h-40" />
    </div>

    <!-- Error State -->
    <UAlert
      v-else-if="error"
      icon="i-heroicons-exclamation-triangle"
      color="red"
      variant="soft"
      title="Failed to load countries"
      :description="error.message"
    />

    <!-- Countries Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <NuxtLink
        v-for="country in filteredCountries"
        :key="country.country"
        :to="`/countries/${encodeURIComponent(country.country)}`"
        class="group"
      >
        <UCard class="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 dark:hover:border-blue-400">
          <div class="flex flex-col h-full">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                  {{ country.country }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ country.count }} {{ country.count === 1 ? 'CFP' : 'CFPs' }} available
                </p>
              </div>
              <div class="text-4xl">
                {{ getCountryFlag(country.country) }}
              </div>
            </div>

            <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm">
                <span>View CFPs</span>
                <Icon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </UCard>
      </NuxtLink>
    </div>

    <!-- Empty State -->
    <div v-if="!pending && !error && filteredCountries.length === 0" class="text-center py-12">
      <Icon name="i-heroicons-globe-alt" class="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        No countries found
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Try adjusting your search
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CountryStats {
  country: string
  count: number
}

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Browse by Country - Call for Papers'
})

const searchQuery = ref('')

// Fetch countries with CFP counts
const { data: countries, pending, error } = await useFetch<CountryStats[]>('/api/countries')

const filteredCountries = computed(() => {
  if (!countries.value) return []
  if (!searchQuery.value) return countries.value

  const query = searchQuery.value.toLowerCase()
  return countries.value.filter(country =>
    country.country.toLowerCase().includes(query)
  )
})

// Country to flag emoji mapping
const countryFlags: Record<string, string> = {
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
  'Spain': '🇪🇸',
  'Italy': '🇮🇹',
  'Netherlands': '🇳🇱',
  'Belgium': '🇧🇪',
  'Switzerland': '🇨🇭',
  'Austria': '🇦🇹',
  'Poland': '🇵🇱',
  'Portugal': '🇵🇹',
  'Sweden': '🇸🇪',
  'Norway': '🇳🇴',
  'Denmark': '🇩🇰',
  'Finland': '🇫🇮',
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
  'New Zealand': '🇳🇿',
  'Japan': '🇯🇵',
  'South Korea': '🇰🇷',
  'Singapore': '🇸🇬',
  'India': '🇮🇳',
  'China': '🇨🇳',
  'Brazil': '🇧🇷',
  'Mexico': '🇲🇽',
  'Argentina': '🇦🇷',
  'South Africa': '🇿🇦',
  'Israel': '🇮🇱',
  'UAE': '🇦🇪',
  'Ireland': '🇮🇪',
  'Czech Republic': '🇨🇿',
  'Greece': '🇬🇷',
  'Turkey': '🇹🇷'
}

function getCountryFlag(country: string): string {
  return countryFlags[country] || '🌍'
}
</script>
