<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Submit a CFP
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        Help the community by submitting a call for papers that you've found.
        All submissions go through a moderation process before being published.
      </p>
    </div>

    <UAlert
      v-if="submitSuccess"
      icon="i-heroicons-check-circle"
      color="green"
      variant="soft"
      title="CFP Submitted Successfully!"
      description="Your submission has been sent for moderation and will be reviewed shortly."
      class="mb-6"
    />

    <UAlert
      v-if="submitError"
      icon="i-heroicons-exclamation-triangle"
      color="red"
      variant="soft"
      title="Submission Failed"
      :description="submitError"
      class="mb-6"
    />

    <UCard>
      <UForm
        :schema="submitFormSchema"
        :state="formState"
        @submit="handleSubmit"
      >
        <div class="space-y-8">
          <!-- Conference Information -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Conference Information
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormGroup label="Conference Name" name="conference.name" required>
                <UInput
                  v-model="formState.conference.name"
                  placeholder="e.g. React Conf 2025"
                />
              </UFormGroup>

              <UFormGroup label="Website URL" name="conference.websiteUrl" required>
                <UInput
                  v-model="formState.conference.websiteUrl"
                  placeholder="https://reactconf.com"
                  type="url"
                />
              </UFormGroup>

              <UFormGroup label="Country" name="conference.country" required>
                <USelectMenu
                  v-model="formState.conference.country"
                  :options="countryOptions"
                  placeholder="Select country"
                  searchable
                  searchable-placeholder="Search countries..."
                  option-attribute="label"
                  value-attribute="value"
                  @update:model-value="onCountryChange"
                />
              </UFormGroup>

              <UFormGroup label="City" name="conference.city" required>
                <UInput
                  v-model="formState.conference.city"
                  placeholder="e.g. San Francisco"
                />
              </UFormGroup>

              <UFormGroup label="Platform (optional)" name="conference.platform" class="md:col-span-2">
                <USelectMenu
                  v-model="formState.conference.platform"
                  :options="platformOptions"
                  placeholder="Select platform"
                  searchable
                  searchable-placeholder="Search platforms..."
                />
              </UFormGroup>
            </div>
          </div>

          <!-- CFP Information -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Call for Papers Details
            </h2>
            <div class="space-y-4">
              <UFormGroup label="CFP URL" name="cfp.cfpUrl" required>
                <UInput
                  v-model="formState.cfp.cfpUrl"
                  placeholder="https://reactconf.com/call-for-speakers"
                  type="url"
                />
              </UFormGroup>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormGroup label="Format" name="cfp.format" required>
                  <USelect
                    v-model="formState.cfp.format"
                    :options="formatOptions"
                    placeholder="Select format"
                  />
                </UFormGroup>

                <UFormGroup label="Closing Date" name="cfp.closesAt" required>
                  <UInput
                    v-model="formState.cfp.closesAt"
                    type="date"
                    :min="new Date().toISOString().split('T')[0]"
                  />
                </UFormGroup>
              </div>

              <UFormGroup label="Opening Date (optional)" name="cfp.opensAt">
                <UInput
                  v-model="formState.cfp.opensAt"
                  type="date"
                />
              </UFormGroup>

              <UFormGroup label="Topics" name="cfp.topics" required>
                <div class="space-y-2">
                  <div class="flex flex-wrap gap-2 mb-2">
                    <UBadge
                      v-for="(topic, index) in formState.cfp.topics"
                      :key="index"
                      variant="soft"
                      color="primary"
                      @click="removeTopic(index)"
                      class="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                    >
                      {{ topic }} ×
                    </UBadge>
                  </div>
                  <USelectMenu
                    v-model="selectedTopic"
                    :options="availableTopics"
                    placeholder="Select topics from the list..."
                    searchable
                    searchable-placeholder="Search topics..."
                    @update:model-value="addTopicFromSelect"
                    class="w-full"
                  >
                    <template #label>
                      <span class="text-gray-500">
                        <Icon name="i-heroicons-tag" class="w-4 h-4 inline mr-1" />
                        Select topics from the list...
                      </span>
                    </template>
                  </USelectMenu>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Select one or more topics that are relevant to your CFP
                  </p>
                </div>
              </UFormGroup>

              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Speaker Benefits
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <UFormGroup name="cfp.perks.travel">
                    <UCheckbox
                      v-model="formState.cfp.perks.travel"
                      label="Travel covered"
                    />
                  </UFormGroup>

                  <UFormGroup name="cfp.perks.hotel">
                    <UCheckbox
                      v-model="formState.cfp.perks.hotel"
                      label="Hotel covered"
                    />
                  </UFormGroup>

                  <UFormGroup name="cfp.perks.honorarium">
                    <UCheckbox
                      v-model="formState.cfp.perks.honorarium"
                      label="Honorarium provided"
                    />
                  </UFormGroup>
                </div>
              </div>

              <UFormGroup label="Additional Notes (optional)" name="cfp.notes">
                <UTextarea
                  v-model="formState.cfp.notes"
                  placeholder="Any additional information about the CFP or conference..."
                  :rows="3"
                />
              </UFormGroup>
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <UButton
              type="button"
              variant="outline"
              @click="resetForm"
            >
              Reset
            </UButton>
            <UButton
              type="submit"
              :loading="submitting"
            >
              Submit CFP
            </UButton>
          </div>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { submitFormSchema } from '../../packages/schemas/zod'
import { Country } from 'country-state-city'
import { TOPICS } from '~/utils/constants'

useHead({
  title: 'Submit CFP - Call for Papers',
  meta: [
    { name: 'description', content: 'Submit a call for papers to help the speaking community discover new opportunities.' }
  ]
})

const formatOptions = [
  { label: 'Conference', value: 'conference' },
  { label: 'Workshop', value: 'workshop' },
  { label: 'Meetup', value: 'meetup' },
  { label: 'Online Event', value: 'online' }
]

const platformOptions = [
  'In-person',
  'Online',
  'Hybrid'
]

// Get all countries from the package - computed once at setup
const allCountries = Country.getAllCountries()
const countryOptions = allCountries.map(country => ({
  label: country.name,
  value: country.name,
  isoCode: country.isoCode
}))

// Create a lookup map for faster country searches
const countryLookup = new Map(
  allCountries.map(country => [country.name, country.isoCode])
)


const formState = reactive({
  conference: {
    name: '',
    websiteUrl: '',
    city: '',
    country: '',
    platform: ''
  },
  cfp: {
    cfpUrl: '',
    topics: [] as string[],
    format: '',
    opensAt: '',
    closesAt: '',
    perks: {
      travel: false,
      hotel: false,
      honorarium: false
    },
    notes: ''
  }
})

const selectedTopic = ref('')
const submitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

// Available topics excluding already selected ones
const availableTopics = computed(() => {
  return TOPICS.filter(topic => !formState.cfp.topics.includes(topic))
})

function onCountryChange(countryName: string) {
  // Reset city when country changes
  formState.conference.city = ''
}

function addTopicFromSelect(topic: string) {
  if (topic && !formState.cfp.topics.includes(topic)) {
    formState.cfp.topics.push(topic)
    selectedTopic.value = ''
  }
}

function removeTopic(index: number) {
  formState.cfp.topics.splice(index, 1)
}

function resetForm() {
  Object.assign(formState, {
    conference: {
      name: '',
      websiteUrl: '',
      city: '',
      country: '',
      platform: ''
    },
    cfp: {
      cfpUrl: '',
      topics: [],
      format: '',
      opensAt: '',
      closesAt: '',
      perks: {
        travel: false,
        hotel: false,
        honorarium: false
      },
      notes: ''
    }
  })
  selectedTopic.value = ''
  submitSuccess.value = false
  submitError.value = ''
}

async function handleSubmit() {
  submitting.value = true
  submitSuccess.value = false
  submitError.value = ''

  try {
    await $fetch('/api/submit', {
      method: 'POST',
      body: formState
    })

    submitSuccess.value = true
    resetForm()
  } catch (error: any) {
    submitError.value = error.data?.error || 'An error occurred while submitting the CFP'
  } finally {
    submitting.value = false
  }
}
</script>