<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="pending" class="space-y-6">
      <USkeleton class="h-8 w-3/4" />
      <USkeleton class="h-4 w-1/2" />
      <USkeleton class="h-64" />
    </div>

    <div v-else-if="error" class="text-center py-12">
      <UAlert
        icon="i-heroicons-exclamation-triangle"
        color="red"
        variant="soft"
        title="CFP not found"
        description="The CFP you're looking for doesn't exist or has been removed."
      />
      <UButton to="/search" class="mt-4">
        Back to Search
      </UButton>
    </div>

    <div v-else-if="cfp">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {{ cfp.title }}
            </h1>
            <div class="flex items-center text-gray-600 dark:text-gray-300 mb-4">
              <Icon name="i-heroicons-map-pin" class="w-5 h-5 mr-2" />
              {{ cfp.city }}, {{ cfp.country }}
            </div>
          </div>
          <DeadlinePill :deadline="cfp.closesAt" />
        </div>

        <div class="flex flex-wrap gap-2 mb-6">
          <UBadge
            v-for="topic in cfp.topics"
            :key="topic"
            variant="soft"
          >
            {{ topic }}
          </UBadge>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Details Card -->
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">CFP Details</h2>
            </template>

            <div class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Format
                  </label>
                  <p class="text-gray-900 dark:text-white">
                    {{ formatType(cfp.format) }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Platform
                  </label>
                  <p class="text-gray-900 dark:text-white">
                    {{ cfp.platform || 'Not specified' }}
                  </p>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Timeline
                </label>
                <div class="space-y-1">
                  <p v-if="cfp.timeline.opensAt" class="text-sm text-gray-600 dark:text-gray-400">
                    Opens: {{ formatDate(cfp.timeline.opensAt) }}
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Closes: {{ formatDate(cfp.timeline.closesAt) }}
                  </p>
                </div>
              </div>

              <div v-if="cfp.notes" class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Additional Notes
                </label>
                <p class="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {{ cfp.notes }}
                </p>
              </div>
            </div>
          </UCard>

          <!-- Perks Card -->
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">Speaker Benefits</h2>
            </template>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="text-center p-4 rounded-lg" :class="cfp.perks.travel ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'">
                <Icon
                  name="i-heroicons-paper-airplane"
                  :class="cfp.perks.travel ? 'text-green-600 dark:text-green-400' : 'text-gray-400'"
                  class="w-8 h-8 mx-auto mb-2"
                />
                <p class="font-medium" :class="cfp.perks.travel ? 'text-green-900 dark:text-green-100' : 'text-gray-500'">
                  Travel
                </p>
                <p class="text-sm" :class="cfp.perks.travel ? 'text-green-700 dark:text-green-200' : 'text-gray-400'">
                  {{ cfp.perks.travel ? 'Covered' : 'Not covered' }}
                </p>
              </div>

              <div class="text-center p-4 rounded-lg" :class="cfp.perks.hotel ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-800'">
                <Icon
                  name="i-heroicons-building-office"
                  :class="cfp.perks.hotel ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'"
                  class="w-8 h-8 mx-auto mb-2"
                />
                <p class="font-medium" :class="cfp.perks.hotel ? 'text-blue-900 dark:text-blue-100' : 'text-gray-500'">
                  Hotel
                </p>
                <p class="text-sm" :class="cfp.perks.hotel ? 'text-blue-700 dark:text-blue-200' : 'text-gray-400'">
                  {{ cfp.perks.hotel ? 'Covered' : 'Not covered' }}
                </p>
              </div>

              <div class="text-center p-4 rounded-lg" :class="cfp.perks.honorarium ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-gray-50 dark:bg-gray-800'">
                <Icon
                  name="i-heroicons-currency-dollar"
                  :class="cfp.perks.honorarium ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'"
                  class="w-8 h-8 mx-auto mb-2"
                />
                <p class="font-medium" :class="cfp.perks.honorarium ? 'text-purple-900 dark:text-purple-100' : 'text-gray-500'">
                  Honorarium
                </p>
                <p class="text-sm" :class="cfp.perks.honorarium ? 'text-purple-700 dark:text-purple-200' : 'text-gray-400'">
                  {{ cfp.perks.honorarium ? 'Provided' : 'Not provided' }}
                </p>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Right Sidebar -->
        <div class="space-y-6">
          <!-- Submission Status Card (if tracked) -->
          <UCard v-if="existingSubmissions.length > 0">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium">Your Talks ({{ existingSubmissions.length }})</h3>
                <UButton
                  @click="handleSubmitProposal"
                  size="xs"
                  variant="ghost"
                >
                  <Icon name="i-heroicons-plus" class="w-4 h-4 mr-1" />
                  Add Talk
                </UButton>
              </div>
            </template>

            <div class="space-y-4">
              <div
                v-for="submission in existingSubmissions"
                :key="submission.id"
                class="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
              >
                <div class="flex items-start justify-between mb-2">
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-gray-900 dark:text-white truncate">
                      {{ submission.talkTitle }}
                    </p>
                  </div>
                  <UBadge
                    :color="getStatusColor(submission.status)"
                    variant="soft"
                    size="sm"
                    class="ml-2"
                  >
                    {{ submission.status }}
                  </UBadge>
                </div>

                <div v-if="submission.appliedAt" class="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Applied: {{ formatDate(submission.appliedAt) }}
                </div>

                <div class="flex gap-1">
                  <UButton
                    v-if="submission.status === 'interested'"
                    @click="quickUpdateStatus(submission.id, 'applied')"
                    size="xs"
                    class="flex-1"
                  >
                    <Icon name="i-heroicons-paper-airplane" class="w-3 h-3 mr-1" />
                    Applied
                  </UButton>

                  <UButton
                    v-if="submission.status === 'applied'"
                    @click="quickUpdateStatus(submission.id, 'accepted')"
                    size="xs"
                    color="green"
                    class="flex-1"
                  >
                    <Icon name="i-heroicons-check-circle" class="w-3 h-3 mr-1" />
                    Accepted
                  </UButton>

                  <UButton
                    v-if="submission.status === 'applied'"
                    @click="quickUpdateStatus(submission.id, 'rejected')"
                    size="xs"
                    color="red"
                    variant="outline"
                    class="flex-1"
                  >
                    <Icon name="i-heroicons-x-circle" class="w-3 h-3 mr-1" />
                    Rejected
                  </UButton>
                </div>
              </div>

              <UButton
                to="/account/submissions"
                variant="ghost"
                size="sm"
                class="w-full justify-center mt-2"
              >
                <Icon name="i-heroicons-pencil-square" class="w-4 h-4 mr-2" />
                View All in Dashboard
              </UButton>
            </div>
          </UCard>

          <!-- Actions Card -->
          <UCard>
            <div class="space-y-4">
              <UButton
                @click="handleSubmitProposal"
                size="lg"
                class="w-full justify-center"
              >
                {{ existingSubmissions.length > 0 ? 'Submit Another Talk' : 'Submit Proposal' }}
                <Icon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 ml-2" />
              </UButton>

              <UButton
                :to="cfp.websiteUrl"
                external
                target="_blank"
                variant="outline"
                size="lg"
                class="w-full justify-center"
              >
                Visit Website
                <Icon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 ml-2" />
              </UButton>
            </div>
          </UCard>

          <!-- Meta Info -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-medium">Information</h3>
            </template>

            <div class="space-y-3 text-sm">
              <div>
                <span class="text-gray-500 dark:text-gray-400">Last updated:</span>
                <p class="font-medium">{{ formatDate(cfp.lastUpdatedAt) }}</p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>

    <!-- Submission Tracking Modal -->
    <UModal v-model="showSubmissionModal">
      <UCard>
        <template #header>
          <h3 class="text-xl font-semibold">Track Your Submission</h3>
        </template>

        <div class="space-y-4">
          <!-- Existing Submissions -->
          <div v-if="existingSubmissions.length > 0" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <Icon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div class="text-sm text-blue-900 dark:text-blue-100">
                <p class="font-medium mb-2">You've already tracked {{ existingSubmissions.length }} talk{{ existingSubmissions.length > 1 ? 's' : '' }} for this CFP:</p>
                <ul class="space-y-1">
                  <li v-for="sub in existingSubmissions" :key="sub.id" class="flex items-center gap-2">
                    <UBadge :color="getStatusColor(sub.status)" size="xs">{{ sub.status }}</UBadge>
                    <span class="text-blue-800 dark:text-blue-200">{{ sub.talkTitle }}</span>
                  </li>
                </ul>
                <p class="text-blue-800 dark:text-blue-200 mt-2">
                  You can submit another talk with a different title below.
                </p>
              </div>
            </div>
          </div>

          <!-- Info Box for New Users -->
          <div v-else class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <Icon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div class="text-sm text-blue-900 dark:text-blue-100">
                <p class="font-medium mb-1">Track multiple talks easily!</p>
                <ul class="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-200">
                  <li>Submit multiple different talks to the same CFP</li>
                  <li>Track the status of each talk individually</li>
                  <li>Never lose track of which talk got accepted</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Talk Title Field (Required) -->
          <UFormGroup
            label="Talk Title"
            required
            help="Give your talk a name so you can track multiple submissions"
          >
            <UInput
              v-model="talkTitle"
              placeholder="e.g., Building Scalable APIs with Node.js"
              size="lg"
              :disabled="!user"
            />
          </UFormGroup>

          <!-- Talk Abstract (Optional) -->
          <UFormGroup
            label="Talk Abstract (Optional)"
            help="Add details about your talk (you can edit this later)"
          >
            <UTextarea
              v-model="talkAbstract"
              placeholder="Brief description of your talk..."
              :rows="3"
              :disabled="!user"
            />
          </UFormGroup>

          <div class="space-y-3">
            <UButton
              @click="trackSubmission('interested')"
              variant="soft"
              size="lg"
              class="w-full justify-center"
              :disabled="!talkTitle.trim()"
            >
              <Icon name="i-heroicons-bookmark" class="w-5 h-5 mr-2" />
              Save for Later
            </UButton>

            <UButton
              @click="trackSubmission('applied')"
              size="lg"
              class="w-full justify-center"
              :disabled="!talkTitle.trim()"
            >
              <Icon name="i-heroicons-arrow-top-right-on-square" class="w-5 h-5 mr-2" />
              Open CFP and Track
            </UButton>

            <UButton
              @click="skipTracking"
              variant="ghost"
              size="lg"
              class="w-full justify-center"
            >
              <Icon name="i-heroicons-arrow-top-right-on-square" class="w-5 h-5 mr-2" />
              Open but Don't Track
            </UButton>
          </div>

          <p v-if="!talkTitle.trim()" class="text-sm text-amber-600 dark:text-amber-400 text-center">
            💡 Please enter a talk title to track this submission
          </p>
        </div>

        <template #footer>
          <div class="flex justify-end">
            <UButton
              variant="ghost"
              @click="closeModal"
            >
              Cancel
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { CfpDetailDTO } from '~/packages/schemas/dto'

const route = useRoute()
const slug = route.params.slug as string
const user = useSupabaseUser()

const { data: cfp, pending, error } = await useFetch<CfpDetailDTO>(`/api/cfps/${slug}`)

const showSubmissionModal = ref(false)
const existingSubmissions = ref<any[]>([])
const talkTitle = ref('')
const talkAbstract = ref('')

// Check if user has already submitted to this CFP
async function checkExistingSubmissions() {
  if (!user.value || !cfp.value) return

  try {
    const submissions = await $fetch<any[]>('/api/user/submissions')
    existingSubmissions.value = submissions.filter(s => s.cfpId === cfp.value.id)
  } catch (error) {
    console.error('Failed to check existing submissions:', error)
  }
}

// Watch for user and CFP data to check existing submissions
watch([user, cfp], () => {
  if (user.value && cfp.value) {
    checkExistingSubmissions()
  }
}, { immediate: true })

useHead(() => ({
  title: cfp.value ? `${cfp.value.title} - Call for Papers` : 'CFP Details',
  meta: [
    { name: 'description', content: cfp.value ? `Submit a proposal for ${cfp.value.title} in ${cfp.value.city}, ${cfp.value.country}. Deadline: ${formatDate(cfp.value.closesAt)}` : 'CFP details' }
  ]
}))

// JSON-LD structured data
useHead(() => ({
  script: cfp.value ? [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Event',
      'name': cfp.value.title,
      'description': `Call for Papers: ${cfp.value.title}`,
      'location': {
        '@type': 'Place',
        'name': `${cfp.value.city}, ${cfp.value.country}`,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': cfp.value.city,
          'addressCountry': cfp.value.country
        }
      },
      'organizer': {
        '@type': 'Organization',
        'url': cfp.value.websiteUrl
      },
      'offers': {
        '@type': 'Offer',
        'url': cfp.value.cfpUrl,
        'validThrough': cfp.value.closesAt
      },
      'eventAttendanceMode': cfp.value.format === 'online'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode'
    })
  }] : []
}))

function formatType(format: string) {
  const typeMap: Record<string, string> = {
    conference: 'Conference',
    workshop: 'Workshop',
    meetup: 'Meetup',
    online: 'Online Event'
  }
  return typeMap[format] || format
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

async function handleSubmitProposal() {
  if (!user.value) {
    await navigateTo('/login')
    return
  }
  // Reset form
  talkTitle.value = ''
  talkAbstract.value = ''
  showSubmissionModal.value = true
}

function closeModal() {
  showSubmissionModal.value = false
  talkTitle.value = ''
  talkAbstract.value = ''
}

async function trackSubmission(status: 'interested' | 'applied' | 'withdrawn') {
  if (!cfp.value || !talkTitle.value.trim()) return

  try {
    // Create new submission
    await $fetch('/api/user/submissions', {
      method: 'POST',
      body: {
        cfpId: cfp.value.id,
        status,
        talkTitle: talkTitle.value.trim(),
        talkAbstract: talkAbstract.value.trim() || undefined,
        appliedAt: status === 'applied' ? new Date().toISOString() : undefined
      }
    })

    // Refresh to get the new submission
    await checkExistingSubmissions()

    closeModal()

    // Open CFP URL in new tab
    window.open(cfp.value.cfpUrl, '_blank')

    // Show success notification
    const toast = useToast()
    toast.add({
      title: 'Talk tracked!',
      description: status === 'applied'
        ? `"${talkTitle.value}" is now tracked. Good luck with your submission!`
        : `"${talkTitle.value}" saved for later. Find it in your dashboard.`,
      icon: 'i-heroicons-check-circle',
      color: 'green'
    })
  } catch (error: any) {
    console.error('Failed to track submission:', error)
    const toast = useToast()

    // Check if it's a duplicate talk title error
    if (error?.statusCode === 409 || error?.data?.message?.includes('already tracked')) {
      toast.add({
        title: 'Duplicate Talk Title',
        description: 'You already have a talk with this title for this CFP. Please use a different title.',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'amber'
      })
    } else {
      toast.add({
        title: 'Error',
        description: error?.data?.message || 'Failed to track submission. Please try again.',
        icon: 'i-heroicons-exclamation-circle',
        color: 'red'
      })
    }
  }
}

function skipTracking() {
  if (!cfp.value) return
  showSubmissionModal.value = false
  window.open(cfp.value.cfpUrl, '_blank')
}

async function quickUpdateStatus(submissionId: string, status: 'applied' | 'accepted' | 'rejected') {
  const submission = existingSubmissions.value.find(s => s.id === submissionId)
  if (!submission) return

  try {
    await $fetch(`/api/user/submissions/${submissionId}`, {
      method: 'PATCH',
      body: {
        status,
        appliedAt: status === 'applied' ? new Date().toISOString() : submission.appliedAt,
        responseReceivedAt: ['accepted', 'rejected'].includes(status) ? new Date().toISOString() : undefined
      }
    })

    // Refresh the existing submissions data
    await checkExistingSubmissions()

    // Show success notification
    const toast = useToast()
    const messages = {
      applied: `"${submission.talkTitle}" marked as Applied!`,
      accepted: `🎉 Congratulations! "${submission.talkTitle}" accepted!`,
      rejected: `"${submission.talkTitle}" marked as Rejected. Keep trying!`
    }
    toast.add({
      title: messages[status],
      description: 'You can update this anytime in your dashboard.',
      icon: 'i-heroicons-check-circle',
      color: status === 'accepted' ? 'green' : status === 'rejected' ? 'red' : 'blue'
    })
  } catch (error: any) {
    console.error('Failed to update status:', error)
    const toast = useToast()
    toast.add({
      title: 'Error',
      description: 'Failed to update status. Please try again.',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red'
    })
  }
}

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
</script>