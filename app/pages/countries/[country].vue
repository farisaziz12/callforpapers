<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <UButton
          to="/search/map"
          variant="ghost"
          icon="i-heroicons-arrow-left"
          size="sm"
        >
          Back to Countries
        </UButton>
      </div>

      <div class="flex items-center gap-4 mb-2">
        <span class="text-5xl">{{ countryFlag }}</span>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ country }}
        </h1>
      </div>
      <p class="text-gray-600 dark:text-gray-400">
        {{ pending ? 'Loading...' : `${cfps?.items?.length || 0} active CFPs and conferences` }}
      </p>
    </div>

    <!-- Filters -->
    <div class="mb-6 flex gap-4 flex-wrap">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass"
        placeholder="Search CFPs..."
        class="w-full sm:w-64"
      />

      <USelectMenu
        v-model="selectedTopic"
        :options="topicOptions"
        placeholder="All Topics"
        class="w-48"
      />

      <USelectMenu
        v-model="selectedFormat"
        :options="formatOptions"
        placeholder="All Formats"
        class="w-48"
      />

      <UButton
        v-if="searchQuery || selectedTopic || selectedFormat"
        variant="ghost"
        @click="clearFilters"
      >
        Clear Filters
      </UButton>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <USkeleton v-for="i in 6" :key="i" class="h-64" />
    </div>

    <!-- Error State -->
    <UAlert
      v-else-if="error"
      icon="i-heroicons-exclamation-triangle"
      color="red"
      variant="soft"
      title="Failed to load CFPs"
      :description="error.message"
    />

    <!-- Empty State -->
    <div v-else-if="!cfps?.items?.length" class="text-center py-12">
      <Icon name="i-heroicons-inbox" class="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        No CFPs found
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        {{ searchQuery || selectedTopic || selectedFormat
          ? 'Try adjusting your filters'
          : 'No active CFPs in this country at the moment' }}
      </p>
      <UButton to="/search">
        Browse All CFPs
      </UButton>
    </div>

    <!-- CFPs Grid -->
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CfpCard
          v-for="cfp in cfps.items"
          :key="cfp.id"
          :cfp="cfp"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CfpCardDTO } from '~/packages/schemas/dto'

const route = useRoute()
const country = decodeURIComponent(route.params.country as string)

definePageMeta({
  layout: 'default'
})

useHead({
  title: `${country} - Call for Papers`
})

const searchQuery = ref('')
const selectedTopic = ref('')
const selectedFormat = ref('')

const topicOptions = [
  { label: 'All Topics', value: '' },
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'Python', value: 'Python' },
  { label: 'DevOps', value: 'DevOps' },
  { label: 'AI/ML', value: 'AI/ML' },
  { label: 'Security', value: 'Security' },
  { label: 'Cloud', value: 'Cloud' },
  { label: 'Web Development', value: 'Web Development' },
  { label: 'Mobile', value: 'Mobile' }
]

const formatOptions = [
  { label: 'All Formats', value: '' },
  { label: 'Conference', value: 'conference' },
  { label: 'Workshop', value: 'workshop' },
  { label: 'Meetup', value: 'meetup' },
  { label: 'Online', value: 'online' }
]

// Fetch CFPs for this country
const queryParams = computed(() => {
  const params: any = {
    country: country,
    pageSize: 100
  }
  if (searchQuery.value) params.q = searchQuery.value
  if (selectedTopic.value) params.topic = selectedTopic.value
  if (selectedFormat.value) params.format = selectedFormat.value
  return params
})

const { data: cfps, pending, error } = await useFetch<{ items: CfpCardDTO[] }>('/api/search', {
  query: queryParams
})

// Country flags
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

const countryFlag = computed(() => {
  return countryFlags[country] || '🌍'
})

function clearFilters() {
  searchQuery.value = ''
  selectedTopic.value = ''
  selectedFormat.value = ''
}
</script>
