<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        My Preferences
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Customize your CFP browsing experience by setting your interests. These preferences will be saved locally in your browser.
      </p>
    </div>

    <div class="space-y-6">
      <!-- Favorite Countries -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <Icon name="i-heroicons-map-pin" class="w-5 h-5" />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Favorite Countries
            </h2>
          </div>
        </template>

        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Select countries you're interested in attending conferences or events.
          </p>

          <div class="flex flex-wrap gap-2 mb-4">
            <UBadge
              v-for="(country, index) in selectedCountries"
              :key="index"
              variant="soft"
              color="primary"
              size="lg"
              @click="removeCountry(index)"
              class="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
            >
              {{ country }} ×
            </UBadge>
            <UBadge
              v-if="selectedCountries.length === 0"
              variant="soft"
              color="gray"
            >
              No countries selected
            </UBadge>
          </div>

          <USelectMenu
            v-model="countryToAdd"
            :options="availableCountries"
            placeholder="Add a country..."
            searchable
            searchable-placeholder="Search countries..."
            @update:model-value="addCountry"
            size="lg"
          >
            <template #label>
              <span class="text-gray-500">
                <Icon name="i-heroicons-plus" class="w-4 h-4 inline mr-1" />
                Add a country
              </span>
            </template>
          </USelectMenu>
        </div>
      </UCard>

      <!-- Favorite Topics -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <Icon name="i-heroicons-tag" class="w-5 h-5" />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Favorite Topics
            </h2>
          </div>
        </template>

        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Select topics you're interested in speaking about or learning more about.
          </p>

          <div class="flex flex-wrap gap-2 mb-4">
            <UBadge
              v-for="(topic, index) in selectedTopics"
              :key="index"
              variant="soft"
              color="primary"
              size="lg"
              @click="removeTopic(index)"
              class="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
            >
              {{ topic }} ×
            </UBadge>
            <UBadge
              v-if="selectedTopics.length === 0"
              variant="soft"
              color="gray"
            >
              No topics selected
            </UBadge>
          </div>

          <USelectMenu
            v-model="topicToAdd"
            :options="availableTopics"
            placeholder="Add a topic..."
            searchable
            searchable-placeholder="Search topics..."
            @update:model-value="addTopic"
            size="lg"
          >
            <template #label>
              <span class="text-gray-500">
                <Icon name="i-heroicons-plus" class="w-4 h-4 inline mr-1" />
                Add a topic
              </span>
            </template>
          </USelectMenu>
        </div>
      </UCard>

      <!-- Favorite Formats -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <Icon name="i-heroicons-presentation-chart-bar" class="w-5 h-5" />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Favorite Formats
            </h2>
          </div>
        </template>

        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Select the event formats you prefer.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UCheckbox
              v-for="format in formatOptions"
              :key="format.value"
              v-model="selectedFormatsSet"
              :value="format.value"
              :label="format.label"
              @update:model-value="updateFormats"
            />
          </div>
        </div>
      </UCard>

      <!-- Saved Searches -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Icon name="i-heroicons-bookmark" class="w-5 h-5" />
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                Saved Searches
              </h2>
            </div>
          </div>
        </template>

        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Your saved search filters will appear here. You can save searches from the search page.
          </p>

          <div v-if="preferences.savedSearches.length === 0" class="text-center py-8">
            <Icon name="i-heroicons-bookmark-slash" class="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p class="text-gray-500 dark:text-gray-400">No saved searches yet</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="search in preferences.savedSearches"
              :key="search.id"
              class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div class="flex-1">
                <h3 class="font-medium text-gray-900 dark:text-white">{{ search.name }}</h3>
                <div class="flex flex-wrap gap-2 mt-2 text-xs">
                  <UBadge v-if="search.filters.q" variant="soft" size="sm">
                    "{{ search.filters.q }}"
                  </UBadge>
                  <UBadge v-if="search.filters.country" variant="soft" size="sm">
                    {{ search.filters.country }}
                  </UBadge>
                  <UBadge v-if="search.filters.topic" variant="soft" size="sm">
                    {{ search.filters.topic }}
                  </UBadge>
                  <UBadge v-if="search.filters.format" variant="soft" size="sm">
                    {{ search.filters.format }}
                  </UBadge>
                </div>
              </div>
              <div class="flex gap-2 ml-4">
                <UButton
                  variant="ghost"
                  size="sm"
                  icon="i-heroicons-arrow-right"
                  @click="navigateToSearch(search)"
                >
                  Go
                </UButton>
                <UButton
                  variant="ghost"
                  size="sm"
                  color="red"
                  icon="i-heroicons-trash"
                  @click="removeSavedSearch(search.id)"
                />
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Actions -->
      <div class="flex justify-between items-center pt-4">
        <UButton
          variant="outline"
          color="gray"
          @click="clearAllPreferences"
        >
          Clear All Preferences
        </UButton>
        <UButton
          color="primary"
          @click="navigateTo('/search')"
        >
          Go to Search
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { COUNTRIES, TOPICS } from '~/utils/constants'

useHead({
  title: 'My Preferences - Call for Papers',
  meta: [
    { name: 'description', content: 'Customize your CFP browsing experience by setting your favorite countries, topics, and formats.' }
  ]
})

const { preferences, setCountries, setTopics, setFormats, removeSavedSearch: removeSearch } = useUserPreferences()
const router = useRouter()

const selectedCountries = ref<string[]>([])
const selectedTopics = ref<string[]>([])
const selectedFormatsSet = ref<Set<string>>(new Set())
const countryToAdd = ref('')
const topicToAdd = ref('')

const formatOptions = [
  { label: 'Conference', value: 'conference' },
  { label: 'Workshop', value: 'workshop' },
  { label: 'Meetup', value: 'meetup' },
  { label: 'Online Event', value: 'online' }
]

const availableCountries = computed(() => {
  return COUNTRIES.filter(country => !selectedCountries.value.includes(country))
})

const availableTopics = computed(() => {
  return TOPICS.filter(topic => !selectedTopics.value.includes(topic))
})

function addCountry(country: string) {
  if (country && !selectedCountries.value.includes(country)) {
    selectedCountries.value.push(country)
    setCountries(selectedCountries.value)
    countryToAdd.value = ''
  }
}

function removeCountry(index: number) {
  selectedCountries.value.splice(index, 1)
  setCountries(selectedCountries.value)
}

function addTopic(topic: string) {
  if (topic && !selectedTopics.value.includes(topic)) {
    selectedTopics.value.push(topic)
    setTopics(selectedTopics.value)
    topicToAdd.value = ''
  }
}

function removeTopic(index: number) {
  selectedTopics.value.splice(index, 1)
  setTopics(selectedTopics.value)
}

function updateFormats() {
  setFormats(Array.from(selectedFormatsSet.value))
}

function removeSavedSearch(id: string) {
  removeSearch(id)
}

function navigateToSearch(search: any) {
  const query: Record<string, string> = {}
  if (search.filters.q) query.q = search.filters.q
  if (search.filters.country) query.country = search.filters.country
  if (search.filters.topic) query.topic = search.filters.topic
  if (search.filters.format) query.format = search.filters.format
  if (search.filters.closesBefore) query.closesBefore = search.filters.closesBefore

  router.push({ path: '/search', query })
}

function clearAllPreferences() {
  selectedCountries.value = []
  selectedTopics.value = []
  selectedFormatsSet.value = new Set()
  setCountries([])
  setTopics([])
  setFormats([])
}

// Load preferences on mount
onMounted(() => {
  selectedCountries.value = [...preferences.value.countries]
  selectedTopics.value = [...preferences.value.topics]
  selectedFormatsSet.value = new Set(preferences.value.formats)
})
</script>
