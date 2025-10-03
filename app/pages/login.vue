<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
          {{ isSignup ? 'Create your account' : 'Welcome back' }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {{ isSignup ? 'Start tracking your CFP applications' : 'Sign in to your account' }}
        </p>
      </div>

      <UCard>
        <UForm :state="formState" @submit="handleSubmit">
          <div class="space-y-4">
            <UFormGroup label="Email" required>
              <UInput
                v-model="formState.email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </UFormGroup>

            <UFormGroup label="Password" required>
              <UInput
                v-model="formState.password"
                type="password"
                :placeholder="isSignup ? 'Create a password (min 6 characters)' : 'Enter your password'"
                required
              />
            </UFormGroup>

            <UFormGroup v-if="isSignup" label="Full Name">
              <UInput
                v-model="formState.fullName"
                type="text"
                placeholder="Your full name"
              />
            </UFormGroup>

            <UAlert
              v-if="error"
              icon="i-heroicons-exclamation-triangle"
              color="red"
              variant="soft"
              :description="error"
            />

            <UAlert
              v-if="success"
              icon="i-heroicons-check-circle"
              color="green"
              variant="soft"
              :description="success"
            />

            <UButton
              type="submit"
              :loading="loading"
              class="w-full"
            >
              {{ isSignup ? 'Create Account' : 'Sign In' }}
            </UButton>

            <div class="text-center">
              <button
                type="button"
                @click="toggleMode"
                class="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {{ isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up" }}
              </button>
            </div>

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
              </div>
            </div>

            <UButton
              type="button"
              variant="outline"
              class="w-full"
              @click="signInWithGithub"
              :loading="githubLoading"
            >
              <Icon name="i-simple-icons-github" class="w-5 h-5 mr-2" />
              GitHub
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
  title: 'Login - Call for Papers'
})

const supabase = useSupabaseClient()
const router = useRouter()
const route = useRoute()

const isSignup = ref(false)
const loading = ref(false)
const githubLoading = ref(false)
const error = ref('')
const success = ref('')

const formState = reactive({
  email: '',
  password: '',
  fullName: ''
})

// Check if user is coming from a redirect
const redirectTo = computed(() => route.query.redirect as string || '/dashboard')

function toggleMode() {
  isSignup.value = !isSignup.value
  error.value = ''
  success.value = ''
}

async function handleSubmit() {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    if (isSignup.value) {
      // Sign up
      const { data, error: authError } = await supabase.auth.signUp({
        email: formState.email,
        password: formState.password,
        options: {
          data: {
            full_name: formState.fullName
          }
        }
      })

      if (authError) throw authError

      if (data?.user?.identities?.length === 0) {
        throw new Error('Email already registered. Please sign in.')
      }

      success.value = 'Account created! Please check your email to confirm your account.'

      // Clear form
      formState.email = ''
      formState.password = ''
      formState.fullName = ''

      // Auto-switch to login after 3 seconds
      setTimeout(() => {
        isSignup.value = false
        success.value = ''
      }, 3000)
    } else {
      // Sign in
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formState.email,
        password: formState.password
      })

      if (authError) throw authError

      if (!data?.user?.id) {
        throw new Error('Authentication failed - no user data')
      }

      // Navigate to dashboard or redirect URL
      await router.push(redirectTo.value)
    }
  } catch (err: any) {
    error.value = err.message || 'An error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}

async function signInWithGithub() {
  githubLoading.value = true
  error.value = ''

  try {
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${redirectTo.value}`
      }
    })

    if (authError) throw authError
  } catch (err: any) {
    error.value = err.message || 'Failed to sign in with GitHub'
    githubLoading.value = false
  }
}
</script>
