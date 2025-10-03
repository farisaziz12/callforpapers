<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink
              to="/"
              class="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <Icon name="i-heroicons-megaphone" class="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              <span class="hidden sm:inline">Call for Papers</span>
              <span class="sm:hidden">CFP</span>
            </NuxtLink>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex space-x-1">
            <NuxtLink
              to="/search"
              class="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium"
              active-class="!bg-blue-50 dark:!bg-blue-900/20 !text-blue-600 dark:!text-blue-400"
            >
              Search
            </NuxtLink>
            <NuxtLink
              to="/search/map"
              class="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium"
              active-class="!bg-blue-50 dark:!bg-blue-900/20 !text-blue-600 dark:!text-blue-400"
            >
              Countries
            </NuxtLink>
            <NuxtLink
              to="/submit"
              class="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium"
              active-class="!bg-blue-50 dark:!bg-blue-900/20 !text-blue-600 dark:!text-blue-400"
            >
              Submit
            </NuxtLink>
          </nav>

          <!-- Right side -->
          <div class="flex items-center space-x-2">
            <!-- Theme Toggle -->
            <button
              @click="toggleColorMode"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              :aria-label="$colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <Icon
                :name="$colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                class="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              />
            </button>

            <!-- User Menu -->
            <div v-if="user" class="hidden md:block">
              <UDropdown :items="userMenuItems" :popper="{ placement: 'bottom-end' }">
                <UButton variant="ghost" size="sm" class="flex items-center gap-2">
                  <UAvatar
                    :src="userProfile?.avatarUrl"
                    :alt="userProfile?.fullName || user.email"
                    size="xs"
                  />
                  <span class="hidden lg:inline text-sm">{{ userProfile?.fullName || user.email?.split('@')[0] }}</span>
                  <Icon name="i-heroicons-chevron-down" class="w-4 h-4" />
                </UButton>
              </UDropdown>
            </div>
            <UButton v-else to="/login" variant="solid" size="sm" class="hidden md:flex">
              Sign In
            </UButton>

            <!-- Mobile menu button -->
            <UButton
              variant="ghost"
              size="sm"
              class="md:hidden"
              @click="showMobileMenu = !showMobileMenu"
            >
              <Icon name="i-heroicons-bars-3" class="w-5 h-5" />
            </UButton>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform opacity-0 -translate-y-2"
          enter-to-class="transform opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform opacity-100 translate-y-0"
          leave-to-class="transform opacity-0 -translate-y-2"
        >
          <div
            v-if="showMobileMenu"
            class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
          >
            <nav class="space-y-1">
              <NuxtLink
                to="/search"
                class="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium"
                active-class="!bg-blue-50 dark:!bg-blue-900/20 !text-blue-600 dark:!text-blue-400"
                @click="showMobileMenu = false"
              >
                Search CFPs
              </NuxtLink>
              <NuxtLink
                to="/submit"
                class="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium"
                active-class="!bg-blue-50 dark:!bg-blue-900/20 !text-blue-600 dark:!text-blue-400"
                @click="showMobileMenu = false"
              >
                Submit CFP
              </NuxtLink>
              <NuxtLink
                to="/account/saved-searches"
                class="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium"
                active-class="!bg-blue-50 dark:!bg-blue-900/20 !text-blue-600 dark:!text-blue-400"
                @click="showMobileMenu = false"
              >
                Saved Searches
              </NuxtLink>
            </nav>
          </div>
        </Transition>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-600 dark:text-gray-400">
          <p class="mb-4">
            Call for Papers - Discover speaking opportunities worldwide
          </p>
          <div class="flex justify-center space-x-6 text-sm">
            <a href="/api/feeds/sitemap.xml" class="hover:text-blue-600 dark:hover:text-blue-400">
              Sitemap
            </a>
            <a href="/api/robots.txt" class="hover:text-blue-600 dark:hover:text-blue-400">
              Robots.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const colorMode = useColorMode()
const showMobileMenu = ref(false)
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Fetch user profile only if user is logged in
const userProfile = ref(null)

watchEffect(async () => {
  if (user.value) {
    try {
      const data = await $fetch('/api/user/profile')
      userProfile.value = data
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      userProfile.value = null
    }
  } else {
    userProfile.value = null
  }
})

const userMenuItems = computed(() => [[
  {
    label: 'Dashboard',
    icon: 'i-heroicons-squares-2x2',
    to: '/dashboard'
  },
  {
    label: 'My Submissions',
    icon: 'i-heroicons-paper-airplane',
    to: '/account/submissions'
  },
  {
    label: 'Saved Searches',
    icon: 'i-heroicons-bookmark',
    to: '/account/saved-searches'
  },
  {
    label: 'Profile Settings',
    icon: 'i-heroicons-user-circle',
    to: '/account/profile'
  }
], [
  {
    label: 'Sign Out',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    click: async () => {
      await supabase.auth.signOut()
      await navigateTo('/login')
    }
  }
]])

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Close mobile menu when route changes
const route = useRoute()
watch(route, () => {
  showMobileMenu.value = false
})
</script>