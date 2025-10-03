<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Saved Searches
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-300">
          Save your search criteria to quickly find relevant CFPs.
        </p>
      </div>
      <UButton @click="showCreateModal = true">
        <Icon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
        New Search
      </UButton>
    </div>

    <div v-if="pending" class="space-y-4">
      <USkeleton
        v-for="i in 3"
        :key="i"
        class="h-24"
      />
    </div>

    <div v-else-if="error" class="text-center py-12">
      <UAlert
        icon="i-heroicons-exclamation-triangle"
        color="red"
        variant="soft"
        title="Failed to load saved searches"
        :description="error.message"
      />
    </div>

    <div v-else-if="!data?.length" class="text-center py-12">
      <div class="text-gray-500 dark:text-gray-400">
        <Icon name="i-heroicons-bookmark" class="w-12 h-12 mx-auto mb-4" />
        <p class="text-lg mb-2">No saved searches yet</p>
        <p>Create your first saved search to get notified about relevant CFPs.</p>
        <UButton
          @click="showCreateModal = true"
          class="mt-4"
        >
          Create Saved Search
        </UButton>
      </div>
    </div>

    <div v-else class="space-y-4">
      <UCard
        v-for="search in data"
        :key="search.id"
        class="hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ search.name }}
            </h3>

            <div class="flex flex-wrap gap-2 mb-3">
              <UBadge
                v-if="search.filters.q"
                variant="soft"
              >
                Query: "{{ search.filters.q }}"
              </UBadge>
              <UBadge
                v-if="search.filters.country"
                variant="soft"
              >
                Country: {{ search.filters.country }}
              </UBadge>
              <UBadge
                v-if="search.filters.topic"
                variant="soft"
              >
                Topic: {{ search.filters.topic }}
              </UBadge>
              <UBadge
                v-if="search.filters.format"
                variant="soft"
              >
                Format: {{ formatType(search.filters.format) }}
              </UBadge>
              <UBadge
                v-if="search.filters.closesBefore"
                variant="soft"
              >
                Deadline: {{ formatDeadline(search.filters.closesBefore) }}
              </UBadge>
            </div>

            <div class="flex space-x-3">
              <UButton
                :to="buildSearchUrl(search.filters)"
                variant="outline"
                size="sm"
              >
                <Icon name="i-heroicons-magnifying-glass" class="w-4 h-4 mr-1" />
                Run Search
              </UButton>

              <UButton
                variant="ghost"
                size="sm"
                color="red"
                @click="deleteSearch(search.id)"
              >
                <Icon name="i-heroicons-trash" class="w-4 h-4 mr-1" />
                Delete
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Create Modal -->
    <UModal v-model="showCreateModal">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Create Saved Search</h2>
        </template>

        <UForm
          :schema="savedSearchSchema"
          :state="createForm"
          @submit="handleCreate"
        >
          <div class="space-y-4">
            <UFormGroup label="Search Name" name="name" required>
              <UInput
                v-model="createForm.name"
                placeholder="e.g. JavaScript Conferences"
              />
            </UFormGroup>

            <UFormGroup label="Search Query" name="filters.q">
              <UInput
                v-model="createForm.filters.q"
                placeholder="Search keywords..."
              />
            </UFormGroup>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormGroup label="Country" name="filters.country">
                <USelect
                  v-model="createForm.filters.country"
                  :options="countryOptions"
                  placeholder="All Countries"
                />
              </UFormGroup>

              <UFormGroup label="Topic" name="filters.topic">
                <USelect
                  v-model="createForm.filters.topic"
                  :options="topicOptions"
                  placeholder="All Topics"
                />
              </UFormGroup>

              <UFormGroup label="Format" name="filters.format">
                <USelect
                  v-model="createForm.filters.format"
                  :options="formatOptions"
                  placeholder="All Formats"
                />
              </UFormGroup>

              <UFormGroup label="Deadline" name="filters.closesBefore">
                <USelect
                  v-model="createForm.filters.closesBefore"
                  :options="deadlineOptions"
                  placeholder="All Deadlines"
                />
              </UFormGroup>
            </div>
          </div>

          <template #footer>
            <div class="flex justify-end space-x-3">
              <UButton
                type="button"
                variant="outline"
                @click="showCreateModal = false"
              >
                Cancel
              </UButton>
              <UButton
                type="submit"
                :loading="creating"
              >
                Save Search
              </UButton>
            </div>
          </template>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { SavedSearchDTO, SearchParams } from '../../../packages/schemas/dto'
import { savedSearchSchema } from '../../../packages/schemas/zod'

useHead({
  title: 'Saved Searches - Call for Papers',
  meta: [
    { name: 'description', content: 'Manage your saved CFP searches and get notified about relevant opportunities.' }
  ]
})

const { data, pending, error, refresh } = await useFetch<SavedSearchDTO[]>('/api/account/saved-searches')

const showCreateModal = ref(false)
const creating = ref(false)

const createForm = reactive({
  name: '',
  filters: {} as SearchParams
})

// Options for dropdowns (simplified for demo)
const countryOptions = [
  { label: 'All Countries', value: '' },
  { label: 'United States', value: 'United States' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'Germany', value: 'Germany' },
  { label: 'Netherlands', value: 'Netherlands' },
  { label: 'Canada', value: 'Canada' }
]

const topicOptions = [
  { label: 'All Topics', value: '' },
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'React', value: 'React' },
  { label: 'Vue.js', value: 'Vue.js' },
  { label: 'Python', value: 'Python' },
  { label: 'DevOps', value: 'DevOps' }
]

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

  return [
    { label: 'All Deadlines', value: '' },
    { label: 'Closing this week', value: nextWeek.toISOString() },
    { label: 'Closing this month', value: nextMonth.toISOString() }
  ]
})

function formatType(format: string) {
  const typeMap: Record<string, string> = {
    conference: 'Conference',
    workshop: 'Workshop',
    meetup: 'Meetup',
    online: 'Online Event'
  }
  return typeMap[format] || format
}

function formatDeadline(deadline: string) {
  const date = new Date(deadline)
  const now = new Date()
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays <= 7) return 'This week'
  if (diffDays <= 30) return 'This month'
  return 'This quarter'
}

function buildSearchUrl(filters: SearchParams) {
  const query = new URLSearchParams()
  if (filters.q) query.set('q', filters.q)
  if (filters.country) query.set('country', filters.country)
  if (filters.topic) query.set('topic', filters.topic)
  if (filters.format) query.set('format', filters.format)
  if (filters.closesBefore) query.set('closesBefore', filters.closesBefore)

  return `/search?${query.toString()}`
}

async function handleCreate() {
  creating.value = true

  try {
    await $fetch('/api/account/saved-searches', {
      method: 'POST',
      body: createForm
    })

    showCreateModal.value = false
    Object.assign(createForm, { name: '', filters: {} })
    await refresh()
  } catch (error) {
    console.error('Failed to create saved search:', error)
  } finally {
    creating.value = false
  }
}

async function deleteSearch(id: string) {
  try {
    await $fetch(`/api/account/saved-searches/${id}`, {
      method: 'DELETE'
    })
    await refresh()
  } catch (error) {
    console.error('Failed to delete saved search:', error)
  }
}
</script>