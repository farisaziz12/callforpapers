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
              Approved CFPs
            </h1>
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
              {{ data?.total || 0 }} approved CFPs
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
          title="Failed to load CFPs"
          :description="error.message"
        />
      </div>

      <!-- Empty state -->
      <div v-else-if="!data?.items?.length" class="text-center py-12 sm:py-16">
        <Icon name="i-heroicons-inbox" class="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p class="text-lg font-medium text-gray-900 dark:text-white mb-2">No approved CFPs</p>
        <p class="text-sm text-gray-600 dark:text-gray-400">Approved CFPs will appear here</p>
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
                {{ item.title }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ item.city }}, {{ item.country }}
              </p>
            </div>

            <!-- Quick info badges -->
            <div class="flex flex-wrap gap-1.5">
              <UBadge size="xs" variant="soft">
                {{ formatType(item.format) }}
              </UBadge>
              <UBadge size="xs" variant="soft" color="orange">
                Closes {{ formatShortDate(item.closesAt) }}
              </UBadge>
              <UBadge v-if="item.perks.travel" size="xs" variant="soft" color="green">
                Travel
              </UBadge>
              <UBadge v-if="item.perks.hotel" size="xs" variant="soft" color="blue">
                Hotel
              </UBadge>
              <UBadge v-if="item.perks.honorarium" size="xs" variant="soft" color="purple">
                Honorarium
              </UBadge>
            </div>

            <!-- Topics -->
            <div class="flex flex-wrap gap-1">
              <UBadge
                v-for="topic in item.topics.slice(0, 4)"
                :key="topic"
                size="xs"
                variant="outline"
              >
                {{ topic }}
              </UBadge>
              <UBadge
                v-if="item.topics.length > 4"
                size="xs"
                variant="outline"
                color="gray"
              >
                +{{ item.topics.length - 4 }}
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
                      :href="item.websiteUrl"
                      target="_blank"
                      class="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"
                    >
                      <Icon name="i-heroicons-globe-alt" class="w-4 h-4 flex-shrink-0" />
                      <span class="truncate">{{ item.websiteUrl }}</span>
                    </a>
                    <a
                      :href="item.cfpUrl"
                      target="_blank"
                      class="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"
                    >
                      <Icon name="i-heroicons-document-text" class="w-4 h-4 flex-shrink-0" />
                      <span class="truncate">{{ item.cfpUrl }}</span>
                    </a>
                  </div>

                  <!-- Timeline -->
                  <div class="grid grid-cols-2 gap-2 text-xs">
                    <div v-if="item.timeline.opensAt">
                      <span class="text-gray-500 dark:text-gray-500 block">Opens</span>
                      <span class="text-gray-900 dark:text-white font-medium">{{ formatShortDate(item.timeline.opensAt) }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500 dark:text-gray-500 block">Closes</span>
                      <span class="text-gray-900 dark:text-white font-medium">{{ formatShortDate(item.timeline.closesAt) }}</span>
                    </div>
                  </div>

                  <!-- Platform -->
                  <div v-if="item.platform" class="text-xs">
                    <span class="text-gray-500 dark:text-gray-500">Platform: </span>
                    <span class="text-gray-900 dark:text-white">{{ item.platform }}</span>
                  </div>

                  <!-- All topics -->
                  <div v-if="item.topics.length > 4" class="text-xs">
                    <span class="text-gray-500 dark:text-gray-500 block mb-1">All Topics:</span>
                    <div class="flex flex-wrap gap-1">
                      <UBadge
                        v-for="topic in item.topics"
                        :key="topic"
                        size="xs"
                        variant="outline"
                      >
                        {{ topic }}
                      </UBadge>
                    </div>
                  </div>

                  <!-- Notes -->
                  <div v-if="item.notes" class="text-xs">
                    <span class="text-gray-500 dark:text-gray-500 block mb-1">Notes:</span>
                    <p class="text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed">{{ item.notes }}</p>
                  </div>

                  <!-- Metadata -->
                  <div class="text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <div>Slug: {{ item.slug }}</div>
                    <div>Last updated {{ formatDate(item.lastUpdatedAt) }}</div>
                  </div>
                </div>
              </template>
            </UAccordion>
          </div>

          <!-- Action buttons -->
          <div class="flex gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
            <UButton
              variant="outline"
              color="blue"
              size="sm"
              class="flex-1"
              @click="openEditModal(item)"
              :loading="processingIds.has(item.id)"
            >
              <Icon name="i-heroicons-pencil" class="w-4 h-4 sm:mr-1.5" />
              <span class="hidden sm:inline">Edit</span>
            </UButton>
            <UButton
              variant="outline"
              color="red"
              size="sm"
              class="flex-1"
              @click="confirmDelete(item.id)"
              :loading="processingIds.has(item.id)"
            >
              <Icon name="i-heroicons-trash" class="w-4 h-4 sm:mr-1.5" />
              <span class="hidden sm:inline">Delete</span>
            </UButton>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="data && data.total > pageSize" class="mt-6 flex justify-center">
        <UPagination
          v-model="currentPage"
          :page-count="pageSize"
          :total="data.total"
        />
      </div>
    </div>

    <!-- Edit Modal -->
    <UModal v-model="editModalOpen">
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-4">Edit CFP</h3>

        <div v-if="editingItem" class="space-y-4">
          <UFormGroup label="Title" required>
            <UInput v-model="editingItem.title" />
          </UFormGroup>

          <div class="grid grid-cols-2 gap-4">
            <UFormGroup label="City" required>
              <UInput v-model="editingItem.city" />
            </UFormGroup>
            <UFormGroup label="Country" required>
              <UInput v-model="editingItem.country" />
            </UFormGroup>
          </div>

          <UFormGroup label="Format" required>
            <USelect
              v-model="editingItem.format"
              :options="[
                { label: 'Conference', value: 'conference' },
                { label: 'Workshop', value: 'workshop' },
                { label: 'Meetup', value: 'meetup' },
                { label: 'Online Event', value: 'online' }
              ]"
            />
          </UFormGroup>

          <UFormGroup label="Website URL" required>
            <UInput v-model="editingItem.websiteUrl" type="url" />
          </UFormGroup>

          <UFormGroup label="CFP URL" required>
            <UInput v-model="editingItem.cfpUrl" type="url" />
          </UFormGroup>

          <div class="grid grid-cols-2 gap-4">
            <UFormGroup label="Opens At">
              <UInput v-model="editingItem.timeline.opensAt" type="datetime-local" />
            </UFormGroup>
            <UFormGroup label="Closes At" required>
              <UInput v-model="editingItem.timeline.closesAt" type="datetime-local" />
            </UFormGroup>
          </div>

          <UFormGroup label="Platform">
            <UInput v-model="editingItem.platform" />
          </UFormGroup>

          <UFormGroup label="Topics (comma separated)" required>
            <UInput v-model="topicsString" />
          </UFormGroup>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Perks</label>
            <div class="space-y-2">
              <UCheckbox v-model="editingItem.perks.travel" label="Travel" />
              <UCheckbox v-model="editingItem.perks.hotel" label="Hotel" />
              <UCheckbox v-model="editingItem.perks.honorarium" label="Honorarium" />
            </div>
          </div>

          <UFormGroup label="Notes">
            <UTextarea v-model="editingItem.notes" :rows="4" />
          </UFormGroup>

          <div class="flex justify-end gap-3 pt-4">
            <UButton variant="ghost" @click="editModalOpen = false">
              Cancel
            </UButton>
            <UButton color="primary" @click="saveEdit" :loading="saving">
              Save Changes
            </UButton>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { CfpDetailDTO } from '~/packages/schemas/dto'

definePageMeta({
  middleware: 'admin'
})

useHead({
  title: 'Approved CFPs - Admin',
  meta: [
    { name: 'description', content: 'Admin panel for managing approved CFPs.' }
  ]
})

const currentPage = ref(1)
const pageSize = 20

const { data, pending, error, refresh } = await useFetch<{ items: CfpDetailDTO[]; total: number }>('/api/admin/cfps', {
  query: {
    page: currentPage,
    pageSize
  },
  watch: [currentPage]
})

const refreshing = ref(false)
const processingIds = ref(new Set<string>())
const editModalOpen = ref(false)
const editingItem = ref<CfpDetailDTO | null>(null)
const topicsString = ref('')
const saving = ref(false)

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

function openEditModal(item: CfpDetailDTO) {
  editingItem.value = JSON.parse(JSON.stringify(item))
  topicsString.value = item.topics.join(', ')
  editModalOpen.value = true
}

async function saveEdit() {
  if (!editingItem.value) return

  saving.value = true
  processingIds.value.add(editingItem.value.id)

  try {
    // Update topics from string
    editingItem.value.topics = topicsString.value.split(',').map(t => t.trim()).filter(Boolean)

    await $fetch(`/api/admin/cfps/${editingItem.value.id}`, {
      method: 'PATCH',
      body: editingItem.value
    })

    await refresh()
    editModalOpen.value = false
    console.log('CFP updated successfully')
  } catch (error: any) {
    console.error('Failed to update CFP:', error.data?.error || error.message)
  } finally {
    saving.value = false
    processingIds.value.delete(editingItem.value.id)
  }
}

async function confirmDelete(id: string) {
  if (!confirm('Are you sure you want to delete this CFP? This action cannot be undone.')) {
    return
  }

  await deleteItem(id)
}

async function deleteItem(id: string) {
  processingIds.value.add(id)

  try {
    await $fetch(`/api/admin/cfps/${id}`, {
      method: 'DELETE'
    })

    await refresh()
    console.log('CFP deleted successfully')
  } catch (error: any) {
    console.error('Failed to delete CFP:', error.data?.error || error.message)
  } finally {
    processingIds.value.delete(id)
  }
}
</script>
