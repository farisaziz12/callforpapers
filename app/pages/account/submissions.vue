<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          My Submissions
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-300">
          Track your CFP applications and their status
        </p>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-6 flex gap-4 flex-wrap">
      <USelectMenu
        v-model="statusFilter"
        :options="statusOptions"
        placeholder="All Statuses"
        class="w-48"
      />
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="space-y-4">
      <USkeleton v-for="i in 5" :key="i" class="h-32" />
    </div>

    <!-- Error State -->
    <UAlert
      v-else-if="error"
      icon="i-heroicons-exclamation-triangle"
      color="red"
      variant="soft"
      title="Failed to load submissions"
      :description="error.message"
    />

    <!-- Empty State -->
    <div v-else-if="filteredSubmissions.length === 0" class="text-center py-12">
      <Icon name="i-heroicons-inbox" class="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        No submissions found
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Start tracking your CFP applications to manage your speaking opportunities
      </p>
      <UButton to="/search" size="lg">
        Browse CFPs
      </UButton>
    </div>

    <!-- Submissions List -->
    <div v-else class="space-y-4">
      <UCard
        v-for="submission in filteredSubmissions"
        :key="submission.id"
        class="hover:shadow-lg transition-shadow"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="flex items-start gap-4">
              <div class="flex-1">
                <NuxtLink
                  :to="`/cfp/${submission.cfp?.slug}`"
                  class="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {{ submission.cfp?.title || 'Unknown CFP' }}
                </NuxtLink>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <Icon name="i-heroicons-map-pin" class="w-4 h-4 inline" />
                  {{ submission.cfp?.city }}, {{ submission.cfp?.country }}
                </p>

                <div class="mt-3 space-y-2">
                  <div v-if="submission.talkTitle">
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Talk: {{ submission.talkTitle }}
                    </p>
                  </div>

                  <div v-if="submission.cfp?.closesAt">
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Deadline: {{ formatDate(submission.cfp.closesAt) }}
                    </p>
                  </div>

                  <div v-if="submission.appliedAt" class="text-sm text-gray-600 dark:text-gray-400">
                    Applied: {{ formatDate(submission.appliedAt) }}
                  </div>

                  <div v-if="submission.notes" class="text-sm text-gray-600 dark:text-gray-400">
                    Notes: {{ submission.notes }}
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <UBadge
                  :color="getStatusColor(submission.status)"
                  variant="soft"
                  size="lg"
                >
                  {{ submission.status }}
                </UBadge>

                <UDropdown :items="getActionItems(submission)">
                  <UButton variant="ghost" size="sm" icon="i-heroicons-ellipsis-vertical" />
                </UDropdown>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Edit Modal -->
    <UModal v-model="showEditModal">
      <UCard>
        <template #header>
          <h3 class="text-xl font-semibold">Update Submission</h3>
        </template>

        <div class="space-y-4">
          <UFormGroup label="Status">
            <USelect
              v-model="editForm.status"
              :options="statusSelectOptions"
            />
          </UFormGroup>

          <UFormGroup label="Talk Title">
            <UInput
              v-model="editForm.talkTitle"
              placeholder="Your talk title"
            />
          </UFormGroup>

          <UFormGroup label="Notes">
            <UTextarea
              v-model="editForm.notes"
              placeholder="Any notes about this submission..."
              :rows="3"
            />
          </UFormGroup>

          <UFormGroup v-if="editForm.status === 'applied'" label="Applied Date">
            <UInput
              v-model="editForm.appliedAt"
              type="date"
            />
          </UFormGroup>

          <UFormGroup v-if="['accepted', 'rejected'].includes(editForm.status)" label="Response Date">
            <UInput
              v-model="editForm.responseReceivedAt"
              type="date"
            />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton variant="ghost" @click="showEditModal = false">
              Cancel
            </UButton>
            <UButton @click="saveEdit" :loading="saving">
              Save Changes
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { UserSubmissionDTO } from '~/packages/schemas/dto'

definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'My Submissions - Call for Papers'
})

const { data: submissions, pending, error, refresh } = await useFetch<UserSubmissionDTO[]>('/api/user/submissions')

const statusFilter = ref('')
const showEditModal = ref(false)
const saving = ref(false)
const currentSubmissionId = ref<string | null>(null)

const editForm = reactive({
  status: '',
  talkTitle: '',
  notes: '',
  appliedAt: '',
  responseReceivedAt: ''
})

const statusOptions = [
  { label: 'All Statuses', value: '' },
  { label: 'Interested', value: 'interested' },
  { label: 'Applied', value: 'applied' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Waitlisted', value: 'waitlisted' },
  { label: 'Withdrawn', value: 'withdrawn' }
]

const statusSelectOptions = [
  { label: 'Interested', value: 'interested' },
  { label: 'Applied', value: 'applied' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Waitlisted', value: 'waitlisted' },
  { label: 'Withdrawn', value: 'withdrawn' }
]

const filteredSubmissions = computed(() => {
  if (!submissions.value) return []
  if (!statusFilter.value) return submissions.value
  return submissions.value.filter(s => s.status === statusFilter.value)
})

function getStatusColor(status: string) {
  switch (status) {
    case 'accepted': return 'green'
    case 'rejected': return 'red'
    case 'applied': return 'blue'
    case 'interested': return 'yellow'
    case 'withdrawn': return 'gray'
    case 'waitlisted': return 'orange'
    default: return 'gray'
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getActionItems(submission: UserSubmissionDTO) {
  return [[
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil',
      click: () => openEditModal(submission)
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: () => deleteSubmission(submission.id)
    }
  ]]
}

function openEditModal(submission: UserSubmissionDTO) {
  currentSubmissionId.value = submission.id
  editForm.status = submission.status
  editForm.talkTitle = submission.talkTitle || ''
  editForm.notes = submission.notes || ''
  editForm.appliedAt = submission.appliedAt ? submission.appliedAt.split('T')[0] : ''
  editForm.responseReceivedAt = submission.responseReceivedAt ? submission.responseReceivedAt.split('T')[0] : ''
  showEditModal.value = true
}

async function saveEdit() {
  if (!currentSubmissionId.value) return

  saving.value = true
  try {
    await $fetch(`/api/user/submissions/${currentSubmissionId.value}`, {
      method: 'PATCH',
      body: {
        status: editForm.status,
        talkTitle: editForm.talkTitle || undefined,
        notes: editForm.notes || undefined,
        appliedAt: editForm.appliedAt || undefined,
        responseReceivedAt: editForm.responseReceivedAt || undefined
      }
    })

    showEditModal.value = false
    await refresh()
  } catch (err: any) {
    console.error('Failed to update submission:', err)
  } finally {
    saving.value = false
  }
}

async function deleteSubmission(id: string) {
  if (!confirm('Are you sure you want to delete this submission?')) return

  try {
    await $fetch(`/api/user/submissions/${id}`, { method: 'DELETE' })
    await refresh()
  } catch (err: any) {
    console.error('Failed to delete submission:', err)
  }
}
</script>
