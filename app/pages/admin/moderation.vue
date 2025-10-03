<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Mobile-optimized header -->
    <div class="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <div class="flex items-center gap-3 mb-2">
          <UButton
            to="/admin"
            variant="ghost"
            size="xs"
            icon="i-heroicons-arrow-left"
          >
            Dashboard
          </UButton>
        </div>
        <div class="flex items-center justify-between gap-3">
          <div class="flex-1 min-w-0">
            <h1 class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
              Moderation Queue
            </h1>
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
              {{ data?.items?.length || 0 }} pending
            </p>
          </div>
          <UButton
            @click="refreshData"
            variant="ghost"
            size="sm"
            :loading="refreshing"
            icon="i-heroicons-arrow-path"
          />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 py-4 sm:py-6">
      <!-- Loading state -->
      <div v-if="pending" class="space-y-3">
        <USkeleton
          v-for="i in 3"
          :key="i"
          class="h-40 rounded-xl"
        />
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="py-8">
        <UAlert
          icon="i-heroicons-exclamation-triangle"
          color="red"
          variant="soft"
          title="Failed to load queue"
          :description="error.message"
        />
      </div>

      <!-- Empty state -->
      <div v-else-if="!data?.items?.length" class="text-center py-12 sm:py-16">
        <Icon name="i-heroicons-clipboard-document-check" class="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p class="text-lg font-medium text-gray-900 dark:text-white mb-2">All caught up!</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">No items need review</p>
      </div>

      <!-- Items list -->
      <div v-else class="space-y-3 sm:space-y-4">
        <div
          v-for="item in data.items"
          :key="item.id"
          class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <!-- Card header - always visible -->
          <div class="p-4 space-y-3">
            <!-- Title & Location -->
            <div>
              <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight mb-1">
                {{ item.payload.cfp.title }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ item.payload.conference.name }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {{ item.payload.conference.city }}, {{ item.payload.conference.country }}
              </p>
            </div>

            <!-- Quick info badges -->
            <div class="flex flex-wrap gap-1.5">
              <UBadge size="xs" variant="soft">
                {{ formatType(item.payload.cfp.format) }}
              </UBadge>
              <UBadge size="xs" variant="soft" color="orange">
                Closes {{ formatShortDate(item.payload.cfp.closesAt) }}
              </UBadge>
              <UBadge v-if="item.payload.cfp.perks.travel" size="xs" variant="soft" color="green">
                Travel
              </UBadge>
              <UBadge v-if="item.payload.cfp.perks.hotel" size="xs" variant="soft" color="blue">
                Hotel
              </UBadge>
              <UBadge v-if="item.payload.cfp.perks.honorarium" size="xs" variant="soft" color="purple">
                Honorarium
              </UBadge>
            </div>

            <!-- Topics -->
            <div class="flex flex-wrap gap-1">
              <UBadge
                v-for="topic in item.payload.cfp.topics.slice(0, 4)"
                :key="topic"
                size="xs"
                variant="outline"
              >
                {{ topic }}
              </UBadge>
              <UBadge
                v-if="item.payload.cfp.topics.length > 4"
                size="xs"
                variant="outline"
                color="gray"
              >
                +{{ item.payload.cfp.topics.length - 4 }}
              </UBadge>
            </div>

            <!-- Expandable details -->
            <UAccordion
              :items="[{
                label: 'View details',
                slot: 'details-' + item.id,
                defaultOpen: false
              }]"
              size="sm"
            >
              <template #default="{ item: accordionItem, open }">
                <UButton
                  variant="ghost"
                  size="xs"
                  class="w-full justify-between text-gray-600 dark:text-gray-400"
                >
                  <span class="text-xs">{{ open ? 'Hide details' : 'View details' }}</span>
                  <Icon
                    :name="open ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                    class="w-4 h-4"
                  />
                </UButton>
              </template>

              <template #[`details-${item.id}`]>
                <div class="px-1 pb-2 space-y-3 text-sm">
                  <!-- URLs -->
                  <div class="space-y-2">
                    <a
                      :href="item.payload.conference.websiteUrl"
                      target="_blank"
                      class="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"
                    >
                      <Icon name="i-heroicons-globe-alt" class="w-4 h-4 flex-shrink-0" />
                      <span class="truncate">{{ item.payload.conference.websiteUrl }}</span>
                    </a>
                    <a
                      :href="item.payload.cfp.cfpUrl"
                      target="_blank"
                      class="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"
                    >
                      <Icon name="i-heroicons-document-text" class="w-4 h-4 flex-shrink-0" />
                      <span class="truncate">{{ item.payload.cfp.cfpUrl }}</span>
                    </a>
                  </div>

                  <!-- Timeline -->
                  <div class="grid grid-cols-2 gap-2 text-xs">
                    <div v-if="item.payload.cfp.opensAt">
                      <span class="text-gray-500 dark:text-gray-500 block">Opens</span>
                      <span class="text-gray-900 dark:text-white font-medium">{{ formatShortDate(item.payload.cfp.opensAt) }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500 dark:text-gray-500 block">Closes</span>
                      <span class="text-gray-900 dark:text-white font-medium">{{ formatShortDate(item.payload.cfp.closesAt) }}</span>
                    </div>
                  </div>

                  <!-- Platform -->
                  <div v-if="item.payload.conference.platform" class="text-xs">
                    <span class="text-gray-500 dark:text-gray-500">Platform: </span>
                    <span class="text-gray-900 dark:text-white">{{ item.payload.conference.platform }}</span>
                  </div>

                  <!-- All topics -->
                  <div v-if="item.payload.cfp.topics.length > 4" class="text-xs">
                    <span class="text-gray-500 dark:text-gray-500 block mb-1">All Topics:</span>
                    <div class="flex flex-wrap gap-1">
                      <UBadge
                        v-for="topic in item.payload.cfp.topics"
                        :key="topic"
                        size="xs"
                        variant="outline"
                      >
                        {{ topic }}
                      </UBadge>
                    </div>
                  </div>

                  <!-- Notes -->
                  <div v-if="item.payload.cfp.notes" class="text-xs">
                    <span class="text-gray-500 dark:text-gray-500 block mb-1">Notes:</span>
                    <p class="text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed">{{ item.payload.cfp.notes }}</p>
                  </div>

                  <!-- Submission info -->
                  <div class="text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800">
                    Submitted {{ formatDate(item.submittedAt) }}
                  </div>
                </div>
              </template>
            </UAccordion>
          </div>

          <!-- Action buttons - sticky at bottom of card -->
          <div class="flex gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
            <UButton
              variant="outline"
              color="red"
              size="sm"
              class="flex-1"
              @click="rejectItem(item.id)"
              :loading="processingIds.has(item.id)"
            >
              <Icon name="i-heroicons-x-mark" class="w-4 h-4 sm:mr-1.5" />
              <span class="hidden sm:inline">Reject</span>
            </UButton>
            <UButton
              color="green"
              size="sm"
              class="flex-1"
              @click="approveItem(item.id)"
              :loading="processingIds.has(item.id)"
            >
              <Icon name="i-heroicons-check" class="w-4 h-4 sm:mr-1.5" />
              <span class="hidden sm:inline">Approve</span>
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModerationItemDTO } from '~/packages/schemas/dto'

definePageMeta({
  middleware: 'admin'
})

useHead({
  title: 'CFP Moderation - Admin',
  meta: [
    { name: 'description', content: 'Admin panel for moderating submitted CFPs before publication.' }
  ]
})

const { data, pending, error, refresh } = await useFetch<{ items: ModerationItemDTO[] }>('/api/admin/moderation')

const refreshing = ref(false)
const processingIds = ref(new Set<string>())

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
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatShortDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

async function refreshData() {
  refreshing.value = true
  try {
    await refresh()
  } finally {
    refreshing.value = false
  }
}

async function approveItem(id: string) {
  processingIds.value.add(id)

  try {
    await $fetch(`/api/admin/moderation/${id}`, {
      method: 'POST'
    })

    await refresh()

    // Show success notification
    // Note: In a real app, you'd use a toast notification system
    console.log('CFP approved successfully')
  } catch (error: any) {
    console.error('Failed to approve CFP:', error.data?.error || error.message)
  } finally {
    processingIds.value.delete(id)
  }
}

async function rejectItem(id: string) {
  processingIds.value.add(id)

  try {
    await $fetch(`/api/admin/moderation/${id}`, {
      method: 'DELETE'
    })

    await refresh()

    // Show success notification
    console.log('CFP rejected successfully')
  } catch (error: any) {
    console.error('Failed to reject CFP:', error.data?.error || error.message)
  } finally {
    processingIds.value.delete(id)
  }
}
</script>