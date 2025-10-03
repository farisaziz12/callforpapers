<template>
  <div>
    <FilterBar
      :filters="filters"
      @update:filters="handleFiltersUpdate"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Search CFPs
        </h1>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ pending ? 'Loading...' : `${data?.total || 0} results found` }}
        </div>
      </div>

      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="i in 12"
          :key="i"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 w-full"></div>
          <div class="p-6 space-y-4">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div class="space-y-2">
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
            <div class="flex gap-2">
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
            </div>
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <UAlert
          icon="i-heroicons-exclamation-triangle"
          color="red"
          variant="soft"
          title="Failed to load CFPs"
          :description="error.message"
        />
      </div>

      <div v-else-if="!data?.items?.length" class="text-center py-12">
        <div class="text-gray-500 dark:text-gray-400">
          <Icon name="i-heroicons-magnifying-glass" class="w-12 h-12 mx-auto mb-4" />
          <p class="text-lg mb-2">No CFPs found</p>
          <p>Try adjusting your search filters or check back later for new opportunities.</p>
        </div>
      </div>

      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <CfpCard
            v-for="cfp in data.items"
            :key="cfp.id"
            :cfp="cfp"
          />
        </div>

        <div v-if="totalPages > 1" class="flex justify-center">
          <UPagination
            v-model="currentPage"
            :page-count="pageSize"
            :total="data.total"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchParams } from '~/packages/schemas/dto'

useHead({
  title: 'Search CFPs - Call for Papers',
  meta: [
    { name: 'description', content: 'Search and filter through conferences, workshops, and meetups looking for speakers.' }
  ]
})

const route = useRoute()
const router = useRouter()

const currentPage = ref(1)
const pageSize = 12

const filters = ref<SearchParams>({
  q: route.query.q as string || '',
  country: route.query.country as string || '',
  topic: route.query.topic as string || '',
  format: route.query.format as any || '',
  closesBefore: route.query.closesBefore as string || '',
  page: parseInt(route.query.page as string || '1'),
  pageSize
})

const { data, pending, error, refresh } = await useFetch('/api/search', {
  query: computed(() => ({
    ...filters.value,
    page: currentPage.value
  })),
  server: true
})

const totalPages = computed(() => Math.ceil((data.value?.total || 0) / pageSize))

function handleFiltersUpdate(newFilters: SearchParams) {
  filters.value = { ...newFilters, page: 1, pageSize }
  currentPage.value = 1

  // Update URL
  const query: Record<string, string> = {}
  if (newFilters.q) query.q = newFilters.q
  if (newFilters.country) query.country = newFilters.country
  if (newFilters.topic) query.topic = newFilters.topic
  if (newFilters.format) query.format = newFilters.format
  if (newFilters.closesBefore) query.closesBefore = newFilters.closesBefore

  router.push({ query })
}

watch(currentPage, (newPage) => {
  const query = { ...route.query, page: newPage.toString() }
  if (newPage === 1) delete query.page
  router.push({ query })
})
</script>