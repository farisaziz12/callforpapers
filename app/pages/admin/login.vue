<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Admin Login
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Sign in with your admin account
        </p>
      </div>

      <UCard>
        <UForm :state="{}" @submit="handleLogin">
          <div class="space-y-4">
            <UFormGroup label="Email" required>
              <UInput
                v-model="email"
                type="email"
                placeholder="admin@example.com"
                required
              />
            </UFormGroup>

            <UFormGroup label="Password" required>
              <UInput
                v-model="password"
                type="password"
                placeholder="Enter password"
                required
              />
            </UFormGroup>

            <UAlert
              v-if="error"
              icon="i-heroicons-exclamation-triangle"
              color="red"
              variant="soft"
              :description="error"
            />

            <UButton
              type="submit"
              :loading="loading"
              class="w-full"
            >
              Sign In
            </UButton>
          </div>
        </UForm>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

useHead({
  title: 'Admin Login - Call for Papers'
})

const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''

  try {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (authError) throw authError

    if (!data?.user?.id) {
      throw new Error('Authentication failed - no user data')
    }

    // Check if user is an admin
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', data.user.id)
      .single()

    if (adminError || !adminData) {
      await supabase.auth.signOut()
      throw new Error('Not authorized as admin')
    }

    // Navigate to admin moderation page
    await navigateTo('/admin/moderation')
  } catch (err: any) {
    error.value = err.message || 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>