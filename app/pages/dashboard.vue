<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Welcome back, {{ dashboard?.user.fullName || dashboard?.user.email?.split('@')[0] || 'Speaker' }}!
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Track your CFP applications and discover new opportunities
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="space-y-6">
      <USkeleton class="h-32" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <USkeleton v-for="i in 4" :key="i" class="h-24" />
      </div>
    </div>

    <!-- Error State -->
    <UAlert
      v-else-if="error"
      icon="i-heroicons-exclamation-triangle"
      color="red"
      variant="soft"
      title="Failed to load dashboard"
      :description="error.message"
    />

    <!-- Dashboard Content -->
    <div v-else-if="dashboard" class="space-y-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Submissions</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {{ dashboard.stats.totalSubmissions }}
              </p>
            </div>
            <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Icon name="i-heroicons-paper-airplane" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
              <p class="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {{ dashboard.stats.acceptedSubmissions }}
              </p>
            </div>
            <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Icon name="i-heroicons-check-circle" class="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p class="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                {{ dashboard.stats.pendingSubmissions }}
              </p>
            </div>
            <div class="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Icon name="i-heroicons-clock" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Saved Searches</p>
              <p class="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                {{ dashboard.stats.savedSearches }}
              </p>
            </div>
            <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Icon name="i-heroicons-bookmark" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Recent Submissions -->
      <div>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Recent Submissions</h2>
          <UButton to="/account/submissions" variant="ghost">
            View All
            <Icon name="i-heroicons-arrow-right" class="w-4 h-4 ml-1" />
          </UButton>
        </div>

        <div v-if="dashboard.recentSubmissions.length === 0" class="text-center py-12">
          <Icon name="i-heroicons-inbox" class="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p class="text-gray-600 dark:text-gray-400 mb-4">No submissions yet</p>
          <UButton to="/search">
            Browse CFPs
          </UButton>
        </div>

        <div v-else class="space-y-4">
          <UCard
            v-for="submission in dashboard.recentSubmissions"
            :key="submission.id"
            class="hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <NuxtLink
                  :to="`/cfp/${submission.cfp?.slug}`"
                  class="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {{ submission.cfp?.title || 'Unknown CFP' }}
                </NuxtLink>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {{ submission.cfp?.city }}, {{ submission.cfp?.country }}
                </p>
                <p v-if="submission.talkTitle" class="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  <strong>Talk:</strong> {{ submission.talkTitle }}
                </p>
              </div>
              <div class="ml-4">
                <UBadge
                  :color="getStatusColor(submission.status)"
                  variant="soft"
                >
                  {{ submission.status }}
                </UBadge>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Recommendations -->
      <div v-if="recommendations && recommendations.length > 0">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Recommended for You</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CfpCard
            v-for="rec in recommendations.slice(0, 3)"
            :key="rec.cfpId"
            :cfp="rec.cfp!"
          />
        </div>
      </div>

      <!-- Closing This Week -->
      <div v-if="dashboard.closingThisWeek.length > 0">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Closing This Week ⏰</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CfpCard
            v-for="cfp in dashboard.closingThisWeek"
            :key="cfp.id"
            :cfp="cfp"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DashboardSummaryDTO, UserRecommendationDTO } from '~/packages/schemas/dto'

definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Dashboard - Call for Papers'
})

const { data: dashboard, pending, error } = await useFetch<DashboardSummaryDTO>('/api/user/dashboard', {
  lazy: true
})

// Fetch recommendations separately
const { data: recommendations } = await useFetch<UserRecommendationDTO[]>('/api/user/recommendations', {
  lazy: true,
  server: false
})

function getStatusColor(status: string) {
  switch (status) {
    case 'accepted':
      return 'green'
    case 'rejected':
      return 'red'
    case 'applied':
      return 'blue'
    case 'interested':
      return 'yellow'
    case 'withdrawn':
      return 'gray'
    case 'waitlisted':
      return 'orange'
    default:
      return 'gray'
  }
}
</script>
