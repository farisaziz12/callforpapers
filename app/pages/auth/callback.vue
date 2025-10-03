<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="text-center">
      <Icon name="i-heroicons-arrow-path" class="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400 animate-spin" />
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        Completing sign in...
      </h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Please wait while we redirect you
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  // Get the redirect URL from query params
  const redirectTo = route.query.redirect as string || '/dashboard'

  // Small delay to ensure auth state is updated
  await new Promise(resolve => setTimeout(resolve, 500))

  // Navigate to the redirect URL
  await router.push(redirectTo)
})
</script>
