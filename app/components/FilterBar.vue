<template>
  <div class="bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div class="xl:col-span-2">
          <UInput
            v-model="localFilters.q"
            placeholder="Search CFPs..."
            icon="i-heroicons-magnifying-glass"
            size="lg"
            @input="debouncedUpdate"
            class="shadow-sm"
          />
        </div>

        <USelectMenu
          v-model="localFilters.country"
          :options="countryOptions"
          placeholder="All Countries"
          searchable
          searchable-placeholder="Search countries..."
          size="lg"
          @update:model-value="updateFilters"
          class="shadow-sm"
        >
          <template #label>
            <span v-if="localFilters.country">
              <Icon name="i-heroicons-map-pin" class="w-4 h-4 inline mr-1" />
              {{ localFilters.country }}
            </span>
            <span v-else class="text-gray-500">All Countries</span>
          </template>
        </USelectMenu>

        <USelectMenu
          v-model="localFilters.topic"
          :options="topicOptions"
          placeholder="All Topics"
          searchable
          searchable-placeholder="Search topics..."
          size="lg"
          @update:model-value="updateFilters"
          class="shadow-sm"
        >
          <template #label>
            <span v-if="localFilters.topic">
              <Icon name="i-heroicons-tag" class="w-4 h-4 inline mr-1" />
              {{ localFilters.topic }}
            </span>
            <span v-else class="text-gray-500">All Topics</span>
          </template>
        </USelectMenu>

        <USelect
          v-model="localFilters.format"
          :options="formatOptions"
          placeholder="All Formats"
          size="lg"
          @change="updateFilters"
          class="shadow-sm"
        />

        <USelect
          v-model="localFilters.closesBefore"
          :options="deadlineOptions"
          placeholder="All Deadlines"
          size="lg"
          @change="updateFilters"
          class="shadow-sm"
        />
      </div>

      <div v-if="hasActiveFilters || showSaveSearch" class="mt-4 flex flex-wrap gap-3 items-center">
        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 items-center">
          <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Active filters:</span>
          <UBadge
            v-if="localFilters.q"
            variant="soft"
            size="md"
            @click="clearFilter('q')"
            class="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
          >
            "{{ localFilters.q }}" ×
          </UBadge>
          <UBadge
            v-if="localFilters.country"
            variant="soft"
            size="md"
            @click="clearFilter('country')"
            class="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
          >
            {{ localFilters.country }} ×
          </UBadge>
          <UBadge
            v-if="localFilters.topic"
            variant="soft"
            size="md"
            @click="clearFilter('topic')"
            class="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
          >
            {{ localFilters.topic }} ×
          </UBadge>
          <UBadge
            v-if="localFilters.format"
            variant="soft"
            size="md"
            @click="clearFilter('format')"
            class="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
          >
            {{ formatOptions.find(f => f.value === localFilters.format)?.label }} ×
          </UBadge>
          <UBadge
            v-if="localFilters.closesBefore"
            variant="soft"
            size="md"
            @click="clearFilter('closesBefore')"
            class="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
          >
            {{ deadlineOptions.find(d => d.value === localFilters.closesBefore)?.label }} ×
          </UBadge>
          <UButton
            variant="ghost"
            size="sm"
            @click="clearAllFilters"
            icon="i-heroicons-x-mark"
          >
            Clear all
          </UButton>
        </div>

        <div v-if="hasActiveFilters" class="ml-auto flex gap-2">
          <UButton
            variant="outline"
            size="sm"
            icon="i-heroicons-bookmark"
            @click="showSaveSearchModal = true"
          >
            Save Search
          </UButton>
        </div>
      </div>

      <!-- Saved Searches -->
      <div v-if="savedSearches.length > 0" class="mt-4">
        <div class="flex items-center gap-2 mb-2">
          <Icon name="i-heroicons-bookmark" class="w-4 h-4 text-gray-500" />
          <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Saved searches:</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="search in savedSearches"
            :key="search.id"
            variant="soft"
            size="sm"
            @click="applySavedSearch(search)"
          >
            {{ search.name }}
          </UButton>
        </div>
      </div>

      <!-- Save Search Modal -->
      <UModal v-model="showSaveSearchModal">
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Save Current Search</h3>
          </template>

          <div class="space-y-4">
            <UFormGroup label="Search Name" name="searchName">
              <UInput
                v-model="saveSearchName"
                placeholder="e.g. React conferences in Europe"
                @keydown.enter="saveCurrentSearch"
              />
            </UFormGroup>
          </div>

          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton
                variant="ghost"
                @click="showSaveSearchModal = false"
              >
                Cancel
              </UButton>
              <UButton
                color="primary"
                @click="saveCurrentSearch"
                :disabled="!saveSearchName.trim()"
              >
                Save
              </UButton>
            </div>
          </template>
        </UCard>
      </UModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchParams } from '~/packages/schemas/dto'
import { useDebounceFn } from '@vueuse/core'
import { COUNTRIES, TOPICS } from '~/utils/constants'

interface Props {
  filters: SearchParams
}

interface Emits {
  (e: 'update:filters', filters: SearchParams): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localFilters = ref<SearchParams>({ ...props.filters })

const countryOptions = COUNTRIES

const topicOptions = TOPICS

const formatOptions = [
  { label: 'All Formats', value: '' },
  { label: 'Conference', value: 'conference' },
  { label: 'Workshop', value: 'workshop' },
  { label: 'Meetup', value: 'meetup' },
  { label: 'Online Event', value: 'online' }
]

const deadlineOptions = computed(() => {
  const now = new Date()
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  const nextQuarter = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)

  return [
    { label: 'All Deadlines', value: '' },
    { label: 'Closing this week', value: nextWeek.toISOString() },
    { label: 'Closing this month', value: nextMonth.toISOString() },
    { label: 'Closing this quarter', value: nextQuarter.toISOString() }
  ]
})

const { preferences, addSavedSearch } = useUserPreferences()

const showSaveSearchModal = ref(false)
const saveSearchName = ref('')
const showSaveSearch = ref(false)

const savedSearches = computed(() => preferences.value.savedSearches)

const hasActiveFilters = computed(() => {
  return !!(localFilters.value.q || localFilters.value.country || localFilters.value.topic ||
           localFilters.value.format || localFilters.value.closesBefore)
})

function updateFilters() {
  emit('update:filters', { ...localFilters.value })
}

const debouncedUpdate = useDebounceFn(updateFilters, 300)

function clearFilter(key: keyof SearchParams) {
  localFilters.value[key] = undefined
  updateFilters()
}

function clearAllFilters() {
  localFilters.value = {}
  updateFilters()
}

function saveCurrentSearch() {
  if (saveSearchName.value.trim()) {
    addSavedSearch(saveSearchName.value, { ...localFilters.value })
    saveSearchName.value = ''
    showSaveSearchModal.value = false
  }
}

function applySavedSearch(search: any) {
  localFilters.value = { ...search.filters }
  updateFilters()
}

watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters }
}, { deep: true })
</script>