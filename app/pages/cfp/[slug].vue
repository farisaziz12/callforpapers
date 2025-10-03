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
          <!-- Actions Card -->
          <UCard>
            <div class="space-y-4">
              <UButton
                :to="cfp.cfpUrl"
                external
                target="_blank"
                size="lg"
                class="w-full justify-center"
              >
                Submit Proposal
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
  </div>
</template>

<script setup lang="ts">
import type { CfpDetailDTO } from '~/packages/schemas/dto'

const route = useRoute()
const slug = route.params.slug as string

const { data: cfp, pending, error } = await useFetch<CfpDetailDTO>(`/api/cfps/${slug}`)

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
</script>