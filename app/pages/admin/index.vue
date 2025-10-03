<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p class="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Manage CFPs, moderation queue, and site settings
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <!-- Moderation Queue Card -->
        <NuxtLink
          to="/admin/moderation"
          class="block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all"
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <Icon name="i-heroicons-clipboard-document-check" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Moderation Queue
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Review and approve submitted CFPs
              </p>
            </div>
            <Icon name="i-heroicons-chevron-right" class="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
          </div>
        </NuxtLink>

        <!-- Approved CFPs Card -->
        <NuxtLink
          to="/admin/approved"
          class="block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all"
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Icon name="i-heroicons-document-check" class="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Approved CFPs
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                View, edit, and delete approved CFPs
              </p>
            </div>
            <Icon name="i-heroicons-chevron-right" class="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
          </div>
        </NuxtLink>

        <!-- Site Settings Card (Placeholder) -->
        <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 opacity-60">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <Icon name="i-heroicons-cog-6-tooth" class="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Site Settings
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Coming soon
              </p>
            </div>
          </div>
        </div>

        <!-- Analytics Card (Placeholder) -->
        <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 opacity-60">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <Icon name="i-heroicons-chart-bar" class="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Analytics
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Coming soon
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">Pending Review</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {{ pendingStats ? stats?.pendingCount || 0 : '-' }}
          </div>
        </div>
        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">Total Approved</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {{ pendingStats ? stats?.totalApproved || 0 : '-' }}
          </div>
        </div>
        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">Closing Next Week</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {{ pendingStats ? stats?.thisWeek || 0 : '-' }}
          </div>
        </div>
        <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">Closing Next Month</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {{ pendingStats ? stats?.thisMonth || 0 : '-' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})

useHead({
  title: 'Admin Dashboard - Call for Papers',
  meta: [
    { name: 'description', content: 'Admin dashboard for managing CFPs and moderation.' }
  ]
})

const { data: stats, pending: pendingStats } = await useFetch('/api/admin/stats')
</script>
