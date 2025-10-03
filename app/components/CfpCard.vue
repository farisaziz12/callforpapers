<template>
  <NuxtLink
    :to="`/cfp/${cfp.slug}`"
    class="group block h-full"
  >
    <div class="h-full bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl hover:-translate-y-1">
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {{ cfp.title }}
        </h3>
        <DeadlinePill :deadline="cfp.closesAt" />
      </div>

      <div class="space-y-2 mb-4">
        <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Icon name="i-heroicons-map-pin" class="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400" />
          {{ cfp.city }}, {{ cfp.country }}
        </div>

        <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Icon name="i-heroicons-cube" class="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400" />
          {{ formatType(cfp.format) }}
        </div>
      </div>

      <div class="flex flex-wrap gap-2 mb-4">
        <UBadge
          v-for="topic in cfp.topics.slice(0, 3)"
          :key="topic"
          variant="soft"
          size="sm"
          class="transition-transform group-hover:scale-105"
        >
          {{ topic }}
        </UBadge>
        <UBadge
          v-if="cfp.topics.length > 3"
          variant="soft"
          size="sm"
          color="gray"
          class="transition-transform group-hover:scale-105"
        >
          +{{ cfp.topics.length - 3 }}
        </UBadge>
      </div>

      <div class="flex flex-wrap gap-2 mb-4">
        <UBadge
          v-if="cfp.perks.travel"
          variant="outline"
          size="sm"
          color="green"
          class="transition-all group-hover:scale-105"
        >
          <Icon name="i-heroicons-paper-airplane" class="w-3 h-3 mr-1" />
          Travel
        </UBadge>
        <UBadge
          v-if="cfp.perks.hotel"
          variant="outline"
          size="sm"
          color="blue"
          class="transition-all group-hover:scale-105"
        >
          <Icon name="i-heroicons-home" class="w-3 h-3 mr-1" />
          Hotel
        </UBadge>
        <UBadge
          v-if="cfp.perks.honorarium"
          variant="outline"
          size="sm"
          color="purple"
          class="transition-all group-hover:scale-105"
        >
          <Icon name="i-heroicons-currency-dollar" class="w-3 h-3 mr-1" />
          Honorarium
        </UBadge>
      </div>

      <div class="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <span class="text-xs text-gray-500 dark:text-gray-400">
          Updated {{ formatDate(cfp.lastUpdatedAt) }}
        </span>

        <div class="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all">
          <span>View Details</span>
          <Icon name="i-heroicons-arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { CfpCardDTO } from '~/packages/schemas/dto'

interface Props {
  cfp: CfpCardDTO
}

defineProps<Props>()

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
    month: 'short',
    day: 'numeric'
  })
}
</script>