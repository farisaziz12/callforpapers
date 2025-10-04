<template>
  <div>
    <!-- Structured Data -->
    <StructuredData type="website" />
    <StructuredData type="organization" />

    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-600/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 0.5s;"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div class="text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full mb-6 border border-gray-200/50 dark:border-gray-700/50 animate-fade-in">
            <Icon name="i-heroicons-sparkles" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Built by speakers, for speakers</span>
          </div>

          <h1 class="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl lg:text-8xl animate-slide-up">
            Find Your Next
            <br>
            <span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Speaking Stage
            </span>
          </h1>

          <p class="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-slide-up" style="animation-delay: 0.1s;">
            The CFP management platform designed by speakers who understand your journey.
            Discover conferences, track deadlines, and never miss an opportunity to share your expertise with the world.
          </p>

          <!-- Key stats -->
          <div class="mt-8 flex flex-wrap justify-center gap-6 text-sm animate-slide-up" style="animation-delay: 0.2s;">
            <div class="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50">
              <Icon name="i-heroicons-document-text" class="w-5 h-5 text-blue-500" />
              <span class="font-semibold text-gray-900 dark:text-white">{{ totalActiveCfps }}</span>
              <span class="text-gray-600 dark:text-gray-400">Active CFPs</span>
            </div>
            <div class="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50">
              <Icon name="i-heroicons-globe-alt" class="w-5 h-5 text-green-500" />
              <span class="font-semibold text-gray-900 dark:text-white">{{ uniqueCountries }}</span>
              <span class="text-gray-600 dark:text-gray-400">Countries</span>
            </div>
            <div class="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50">
              <Icon name="i-heroicons-clock" class="w-5 h-5 text-purple-500" />
              <span class="text-gray-600 dark:text-gray-400">Updated Daily</span>
            </div>
          </div>

          <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style="animation-delay: 0.3s;">
            <UButton
              to="/search"
              size="xl"
              class="w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Icon name="i-heroicons-magnifying-glass" class="w-5 h-5 mr-2" />
              Explore Opportunities
            </UButton>
            <UButton
              to="/submit"
              variant="outline"
              size="xl"
              class="w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              <Icon name="i-heroicons-plus-circle" class="w-5 h-5 mr-2" />
              Submit a CFP
            </UButton>
          </div>

        </div>
      </div>
    </div>

    <!-- Country Coverage -->
    <div class="bg-white dark:bg-gray-900 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 animate-fade-in">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Global Opportunities</h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">Active CFPs across {{ uniqueCountries }} countries worldwide</p>
        </div>

        <div v-if="countryStats && countryStats.length > 0" class="flex flex-wrap justify-center gap-4 mb-16">
          <NuxtLink
            v-for="(stat, index) in countryStats.slice(0, 12)"
            :key="stat.country"
            :to="`/countries/${stat.country.toLowerCase()}`"
            class="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all duration-300 hover:scale-105 animate-slide-up"
            :style="`animation-delay: ${index * 0.05}s;`"
          >
            <span class="text-2xl">{{ getFlagEmoji(stat.country) }}</span>
            <span class="font-medium text-gray-900 dark:text-white">{{ stat.country }}</span>
            <span class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-semibold">{{ stat.count }}</span>
          </NuxtLink>
        </div>

        <div class="text-center mb-12 animate-fade-in">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">Find and submit to speaking opportunities in three simple steps</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center group hover:scale-105 transition-all duration-500 animate-slide-up" style="animation-delay: 0.1s;">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
              <Icon name="i-heroicons-magnifying-glass" class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">1. Search & Filter</h3>
            <p class="text-gray-600 dark:text-gray-400">Browse through curated CFPs filtered by topic, location, format, and perks.</p>
          </div>

          <div class="text-center group hover:scale-105 transition-all duration-500 animate-slide-up" style="animation-delay: 0.2s;">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
              <Icon name="i-heroicons-bookmark" class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">2. Track Progress</h3>
            <p class="text-gray-600 dark:text-gray-400">Manage your submissions, track deadlines, and never miss an opportunity again.</p>
          </div>

          <div class="text-center group hover:scale-105 transition-all duration-500 animate-slide-up" style="animation-delay: 0.3s;">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
              <Icon name="i-heroicons-paper-airplane" class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">3. Submit & Speak</h3>
            <p class="text-gray-600 dark:text-gray-400">Submit your proposals before the deadline and share your knowledge with the world.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-gray-800/50">
      <div class="text-center mb-12 animate-fade-in">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Browse by Category</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300">Quick filters to help you find relevant opportunities</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <NuxtLink
          v-for="(filter, index) in quickFilters"
          :key="filter.value"
          :to="`/search?${filter.param}=${filter.value}`"
          class="group relative overflow-hidden bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 animate-slide-up"
          :style="`animation-delay: ${index * 0.1}s;`"
        >
          <div class="flex flex-col items-center justify-center text-center">
            <Icon :name="filter.icon" class="w-10 h-10 mb-3 text-gray-700 dark:text-gray-300 group-hover:scale-125 transition-all duration-300" />
            <span class="text-base font-medium text-gray-900 dark:text-white">{{ filter.label }}</span>
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </NuxtLink>
      </div>

<!-- Active CFPs Section -->
      <div class="mb-16">
        <div class="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Active Call for Papers</h2>
            <p class="text-gray-600 dark:text-gray-400">Currently accepting speaker proposals</p>
          </div>
          <UButton
            to="/search"
            variant="solid"
            size="lg"
            class="hidden sm:flex hover:scale-105 transition-transform duration-300"
          >
            View All
            <Icon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2" />
          </UButton>
        </div>

        <div v-if="pendingActive" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <USkeleton
            v-for="i in 6"
            :key="i"
            class="h-64"
          />
        </div>

        <div v-else-if="errorActive" class="text-center py-12">
          <UAlert
            icon="i-heroicons-exclamation-triangle"
            color="red"
            variant="soft"
            title="Failed to load CFPs"
            :description="errorActive.message"
          />
        </div>

        <div v-else-if="activeCfps.length === 0" class="text-center py-12">
          <div class="text-gray-500 dark:text-gray-400">
            <Icon name="i-heroicons-magnifying-glass" class="w-12 h-12 mx-auto mb-4" />
            <p>No active CFPs found.</p>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CfpCard
            v-for="(cfp, index) in activeCfps"
            :key="cfp.id"
            :cfp="cfp"
            class="hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl animate-fade-in"
            :style="`animation-delay: ${index * 0.1}s;`"
          />
        </div>
      </div>

      <!-- Closing Soon Section -->
      <div>
        <div class="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Closing Soon ⏰</h2>
            <p class="text-gray-600 dark:text-gray-400">Don't miss these opportunities - deadlines approaching!</p>
          </div>
          <UButton
            to="/search?closesBefore=7d"
            variant="solid"
            size="lg"
            class="hidden sm:flex hover:scale-105 transition-transform duration-300"
          >
            View All
            <Icon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2" />
          </UButton>
        </div>

        <div v-if="pendingClosing" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <USkeleton
            v-for="i in 6"
            :key="i"
            class="h-64"
          />
        </div>

        <div v-else-if="errorClosing" class="text-center py-12">
          <UAlert
            icon="i-heroicons-exclamation-triangle"
            color="red"
            variant="soft"
            title="Failed to load CFPs"
            :description="errorClosing.message"
          />
        </div>

        <div v-else-if="closingSoon.length === 0" class="text-center py-12">
          <div class="text-gray-500 dark:text-gray-400">
            <Icon name="i-heroicons-magnifying-glass" class="w-12 h-12 mx-auto mb-4" />
            <p>No CFPs closing soon found.</p>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CfpCard
            v-for="(cfp, index) in closingSoon"
            :key="cfp.id"
            :cfp="cfp"
            class="hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl animate-fade-in"
            :style="`animation-delay: ${index * 0.1}s;`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CfpCardDTO } from '~/packages/schemas/dto'

useHead({
  title: 'Call for Papers - Find Your Next Speaking Opportunity',
  meta: [
    { name: 'description', content: 'Discover conferences, workshops, and meetups worldwide that are actively seeking speakers. Never miss a call for papers again.' }
  ]
})

const quickFilters = [
  { label: 'JavaScript', value: 'JavaScript', param: 'topic', icon: 'i-logos-javascript' },
  { label: 'Python', value: 'Python', param: 'topic', icon: 'i-logos-python' },
  { label: 'Online', value: 'online', param: 'format', icon: 'i-heroicons-computer-desktop' },
  { label: 'Travel Covered', value: 'travel', param: 'perks', icon: 'i-heroicons-paper-airplane' }
]

// Fetch active CFPs with total count
const { data: searchResults, pending: pendingActive, error: errorActive } = await useFetch<{ items: CfpCardDTO[], total: number }>('/api/search', {
  query: {
    pageSize: 6,
    sortBy: 'created_at',
    sortOrder: 'desc'
  }
})

const activeCfps = computed(() => searchResults.value?.items || [])
const totalActiveCfps = computed(() => searchResults.value?.total || 0)

// Fetch country stats
const { data: countryStats } = await useFetch<{ country: string, count: number }[]>('/api/countries')

const uniqueCountries = computed(() => countryStats.value?.length || 0)

// Helper function to convert country name to flag emoji
function getFlagEmoji(countryName: string): string {
  const countryToCode: Record<string, string> = {
    'United States': 'US',
    'United Kingdom': 'GB',
    'Canada': 'CA',
    'Australia': 'AU',
    'Germany': 'DE',
    'France': 'FR',
    'Spain': 'ES',
    'Italy': 'IT',
    'Netherlands': 'NL',
    'Belgium': 'BE',
    'Switzerland': 'CH',
    'Austria': 'AT',
    'Poland': 'PL',
    'Sweden': 'SE',
    'Norway': 'NO',
    'Denmark': 'DK',
    'Finland': 'FI',
    'Ireland': 'IE',
    'Portugal': 'PT',
    'Greece': 'GR',
    'Czech Republic': 'CZ',
    'Hungary': 'HU',
    'Romania': 'RO',
    'Bulgaria': 'BG',
    'Croatia': 'HR',
    'India': 'IN',
    'China': 'CN',
    'Japan': 'JP',
    'South Korea': 'KR',
    'Singapore': 'SG',
    'Malaysia': 'MY',
    'Thailand': 'TH',
    'Indonesia': 'ID',
    'Philippines': 'PH',
    'Vietnam': 'VN',
    'Brazil': 'BR',
    'Mexico': 'MX',
    'Argentina': 'AR',
    'Chile': 'CL',
    'Colombia': 'CO',
    'Peru': 'PE',
    'South Africa': 'ZA',
    'Nigeria': 'NG',
    'Kenya': 'KE',
    'Egypt': 'EG',
    'Israel': 'IL',
    'Turkey': 'TR',
    'United Arab Emirates': 'AE',
    'Saudi Arabia': 'SA',
    'New Zealand': 'NZ',
    'Russia': 'RU',
    'Ukraine': 'UA'
  }

  const code = countryToCode[countryName]
  if (!code) return '🌍'

  // Convert country code to flag emoji
  const codePoints = code
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

// Fetch closing soon CFPs
const nextWeek = new Date()
nextWeek.setDate(nextWeek.getDate() + 7)

const { data: closingSoon, pending: pendingClosing, error: errorClosing } = await useFetch<{ items: CfpCardDTO[] }>('/api/search', {
  query: {
    closesBefore: nextWeek.toISOString(),
    pageSize: 6
  },
  transform: (data: any) => data.items || []
})
</script>