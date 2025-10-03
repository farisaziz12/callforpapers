<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Profile Settings
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Manage your speaker profile and preferences
      </p>
    </div>

    <UAlert
      v-if="saveSuccess"
      icon="i-heroicons-check-circle"
      color="green"
      variant="soft"
      title="Profile saved successfully!"
      class="mb-6"
    />

    <UAlert
      v-if="saveError"
      icon="i-heroicons-exclamation-triangle"
      color="red"
      variant="soft"
      title="Failed to save profile"
      :description="saveError"
      class="mb-6"
    />

    <div v-if="loading" class="space-y-6">
      <USkeleton class="h-32" />
      <USkeleton class="h-64" />
    </div>

    <UCard v-else-if="profile">
      <UForm :state="profile" @submit="saveProfile">
        <div class="space-y-6">
          <!-- Basic Information -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormGroup label="Full Name" class="md:col-span-2">
                <UInput
                  v-model="profile.fullName"
                  placeholder="John Doe"
                />
              </UFormGroup>

              <UFormGroup label="Email" class="md:col-span-2">
                <UInput
                  :model-value="profile.email"
                  disabled
                  type="email"
                />
                <template #help>
                  <span class="text-xs text-gray-500">Email cannot be changed</span>
                </template>
              </UFormGroup>

              <UFormGroup label="Bio" class="md:col-span-2">
                <UTextarea
                  v-model="profile.bio"
                  placeholder="Tell us about yourself..."
                  :rows="4"
                />
              </UFormGroup>

              <UFormGroup label="Speaking Experience">
                <USelect
                  v-model="profile.speakingExperience"
                  :options="experienceOptions"
                  placeholder="Select experience level"
                />
              </UFormGroup>
            </div>
          </div>

          <!-- Social Links -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Social Links
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormGroup label="Website URL">
                <UInput
                  v-model="profile.websiteUrl"
                  type="url"
                  placeholder="https://yourwebsite.com"
                />
              </UFormGroup>

              <UFormGroup label="Twitter Handle">
                <UInput
                  v-model="profile.twitterHandle"
                  placeholder="@username"
                />
              </UFormGroup>

              <UFormGroup label="LinkedIn URL">
                <UInput
                  v-model="profile.linkedinUrl"
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                />
              </UFormGroup>

              <UFormGroup label="GitHub URL">
                <UInput
                  v-model="profile.githubUrl"
                  type="url"
                  placeholder="https://github.com/username"
                />
              </UFormGroup>
            </div>
          </div>

          <!-- Preferences -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Preferences
            </h2>

            <div class="space-y-4">
              <UFormGroup label="Preferred Topics">
                <USelectMenu
                  v-model="profile.preferredTopics"
                  :options="TOPICS"
                  multiple
                  placeholder="Select topics you're interested in"
                  searchable
                  searchable-placeholder="Search topics..."
                />
              </UFormGroup>

              <UFormGroup label="Preferred Formats">
                <USelectMenu
                  v-model="profile.preferredFormats"
                  :options="formatOptions"
                  multiple
                  placeholder="Select event formats you prefer"
                />
              </UFormGroup>

              <div class="space-y-3">
                <UCheckbox
                  v-model="profile.willingToTravel"
                  label="Willing to travel for conferences"
                />

                <UCheckbox
                  v-model="profile.availableForSpeaking"
                  label="Currently available for speaking opportunities"
                />
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <UButton type="button" variant="ghost" @click="resetForm">
              Reset
            </UButton>
            <UButton type="submit" :loading="saving">
              Save Profile
            </UButton>
          </div>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { TOPICS } from '~/utils/constants'

definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Profile Settings - Call for Papers'
})

const { data: originalProfile, pending: loading } = await useFetch('/api/user/profile')

const profile = ref<any>(null)
const saving = ref(false)
const saveSuccess = ref(false)
const saveError = ref('')

// Initialize profile from API data
watch(() => originalProfile.value, (data) => {
  if (data) {
    profile.value = {
      email: data.email,
      fullName: data.fullName || '',
      bio: data.bio || '',
      websiteUrl: data.websiteUrl || '',
      twitterHandle: data.twitterHandle || '',
      linkedinUrl: data.linkedinUrl || '',
      githubUrl: data.githubUrl || '',
      speakingExperience: data.speakingExperience || '',
      preferredTopics: data.preferredTopics || [],
      preferredFormats: data.preferredFormats || [],
      willingToTravel: data.willingToTravel ?? true,
      availableForSpeaking: data.availableForSpeaking ?? true
    }
  }
}, { immediate: true })

const experienceOptions = [
  { label: 'Select level...', value: '' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Expert', value: 'expert' }
]

const formatOptions = [
  { label: 'Conference', value: 'conference' },
  { label: 'Workshop', value: 'workshop' },
  { label: 'Meetup', value: 'meetup' },
  { label: 'Online Event', value: 'online' }
]

async function saveProfile() {
  if (!profile.value) return

  saving.value = true
  saveSuccess.value = false
  saveError.value = ''

  try {
    await $fetch('/api/user/profile', {
      method: 'PATCH',
      body: {
        fullName: profile.value.fullName || undefined,
        bio: profile.value.bio || undefined,
        websiteUrl: profile.value.websiteUrl || undefined,
        twitterHandle: profile.value.twitterHandle || undefined,
        linkedinUrl: profile.value.linkedinUrl || undefined,
        githubUrl: profile.value.githubUrl || undefined,
        speakingExperience: profile.value.speakingExperience || undefined,
        preferredTopics: profile.value.preferredTopics,
        preferredFormats: profile.value.preferredFormats,
        willingToTravel: profile.value.willingToTravel,
        availableForSpeaking: profile.value.availableForSpeaking
      }
    })

    saveSuccess.value = true
    setTimeout(() => {
      saveSuccess.value = false
    }, 3000)
  } catch (err: any) {
    saveError.value = err.data?.message || 'Failed to save profile'
  } finally {
    saving.value = false
  }
}

function resetForm() {
  if (originalProfile.value) {
    profile.value = {
      email: originalProfile.value.email,
      fullName: originalProfile.value.fullName || '',
      bio: originalProfile.value.bio || '',
      websiteUrl: originalProfile.value.websiteUrl || '',
      twitterHandle: originalProfile.value.twitterHandle || '',
      linkedinUrl: originalProfile.value.linkedinUrl || '',
      githubUrl: originalProfile.value.githubUrl || '',
      speakingExperience: originalProfile.value.speakingExperience || '',
      preferredTopics: originalProfile.value.preferredTopics || [],
      preferredFormats: originalProfile.value.preferredFormats || [],
      willingToTravel: originalProfile.value.willingToTravel ?? true,
      availableForSpeaking: originalProfile.value.availableForSpeaking ?? true
    }
  }
}
</script>
