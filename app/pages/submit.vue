<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
    <!-- Auto-save Indicator -->
    <div class="fixed top-20 right-4 z-50">
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-1"
      >
        <div
          v-if="showSaveIndicator"
          class="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
        >
          <Icon
            :name="saveState === 'saving' ? 'i-heroicons-arrow-path' : 'i-heroicons-check-circle'"
            class="w-4 h-4"
            :class="saveState === 'saving' ? 'text-blue-500 animate-spin' : 'text-green-500'"
          />
          <span class="text-xs font-medium text-gray-700 dark:text-gray-300">
            {{ saveState === 'saving' ? 'Saving...' : 'Draft saved' }}
          </span>
        </div>
      </transition>
    </div>

    <!-- Success Message -->
    <UAlert
      v-if="submitSuccess"
      icon="i-heroicons-check-circle"
      color="green"
      variant="soft"
      title="CFP Submitted Successfully!"
      description="Your submission has been sent for moderation and will be reviewed shortly. Thank you for contributing to the speaker community!"
      class="mb-6"
    />

    <!-- Error Message -->
    <UAlert
      v-if="submitError"
      icon="i-heroicons-exclamation-triangle"
      color="red"
      variant="soft"
      title="Submission Failed"
      :description="submitError"
      class="mb-6"
      @close="submitError = ''"
    />

    <!-- Draft Restored Message -->
    <UAlert
      v-if="draftRestored"
      icon="i-heroicons-document-arrow-up"
      color="blue"
      variant="soft"
      title="Draft Restored"
      description="We've restored your previous draft. Continue where you left off!"
      class="mb-6"
      @close="draftRestored = false"
    />

    <!-- Step-by-step Form -->
    <div v-if="!submitSuccess" class="space-y-6">
      <!-- Header -->
      <div class="text-center mb-6 sm:mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
          Submit a Call for Papers
        </h1>
        <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400">
          Help fellow speakers discover amazing opportunities
        </p>
      </div>

      <!-- Progress Indicator -->
      <div class="mb-6 sm:mb-8">
        <div class="flex items-center justify-between mb-4">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex items-center"
            :class="{ 'flex-1': index < steps.length - 1 }"
          >
            <div class="flex flex-col items-center">
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 text-sm sm:text-base"
                :class="[
                  currentStep > index
                    ? 'bg-green-500 text-white'
                    : currentStep === index
                    ? 'bg-blue-500 text-white ring-2 sm:ring-4 ring-blue-200 dark:ring-blue-800'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                ]"
              >
                <Icon v-if="currentStep > index" name="i-heroicons-check" class="w-4 h-4 sm:w-5 sm:h-5" />
                <span v-else>{{ index + 1 }}</span>
              </div>
              <span
                class="mt-2 text-xs font-medium text-center hidden sm:block max-w-[80px]"
                :class="[
                  currentStep >= index
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                ]"
              >
                {{ step.title }}
              </span>
            </div>
            <div
              v-if="index < steps.length - 1"
              class="flex-1 h-0.5 sm:h-1 mx-1 sm:mx-2 rounded transition-all duration-300"
              :class="[
                currentStep > index
                  ? 'bg-green-500'
                  : 'bg-gray-200 dark:bg-gray-700'
              ]"
            />
          </div>
        </div>

        <!-- Mobile Step Title -->
        <div class="sm:hidden text-center mt-3">
          <p class="text-xs text-gray-500 dark:text-gray-400">Step {{ currentStep + 1 }} of {{ steps.length }}</p>
          <p class="text-sm font-medium text-gray-900 dark:text-white">{{ steps[currentStep].title }}</p>
        </div>
      </div>

      <!-- Form Card -->
      <UCard>
        <UForm
          :schema="currentStepSchema"
          :state="formState"
          @submit="handleStepSubmit"
        >
          <div class="space-y-6">
            <!-- Step Title -->
            <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ steps[currentStep].title }}
              </h2>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {{ steps[currentStep].description }}
              </p>
            </div>

            <!-- Step 0: Conference Basic Info -->
            <div v-if="currentStep === 0" class="space-y-4">
              <UFormGroup label="Conference Name" name="conference.name" required>
                <UInput
                  v-model="formState.conference.name"
                  placeholder="e.g. React Conf 2025"
                  size="lg"
                  autofocus
                />
              </UFormGroup>

              <UFormGroup label="Website URL" name="conference.websiteUrl" required>
                <UInput
                  v-model="formState.conference.websiteUrl"
                  placeholder="https://reactconf.com"
                  type="url"
                  size="lg"
                />
              </UFormGroup>

              <UFormGroup label="Call for Papers URL" name="cfp.cfpUrl" required>
                <UInput
                  v-model="formState.cfp.cfpUrl"
                  placeholder="https://reactconf.com/call-for-speakers"
                  type="url"
                  size="lg"
                />
              </UFormGroup>
            </div>

            <!-- Step 1: Location & Format -->
            <div v-if="currentStep === 1" class="space-y-4">
              <UFormGroup label="Country" name="conference.country" required>
                <USelectMenu
                  v-model="formState.conference.country"
                  :options="countryOptions"
                  placeholder="Select country"
                  searchable
                  searchable-placeholder="Search countries..."
                  option-attribute="label"
                  value-attribute="value"
                  size="lg"
                  @update:model-value="onCountryChange"
                />
              </UFormGroup>

              <UFormGroup label="City" name="conference.city" required>
                <UInput
                  v-model="formState.conference.city"
                  placeholder="e.g. San Francisco"
                  size="lg"
                />
              </UFormGroup>

              <UFormGroup label="Event Format" name="cfp.format" required>
                <USelect
                  v-model="formState.cfp.format"
                  :options="formatOptions"
                  placeholder="Select format"
                  size="lg"
                />
              </UFormGroup>

              <UFormGroup label="Platform" name="conference.platform">
                <USelectMenu
                  v-model="formState.conference.platform"
                  :options="platformOptions"
                  placeholder="Select platform (optional)"
                  searchable
                  searchable-placeholder="Search platforms..."
                  size="lg"
                />
              </UFormGroup>
            </div>

            <!-- Step 2: CFP Timeline -->
            <div v-if="currentStep === 2" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UFormGroup label="CFP Opening Date" name="cfp.opensAt">
                  <UInput
                    v-model="formState.cfp.opensAt"
                    type="date"
                    size="lg"
                  />
                  <template #help>
                    <span class="text-xs">When did/will the CFP open? (Optional)</span>
                  </template>
                </UFormGroup>

                <UFormGroup label="CFP Closing Date" name="cfp.closesAt" required>
                  <UInput
                    v-model="formState.cfp.closesAt"
                    type="date"
                    size="lg"
                    :min="new Date().toISOString().split('T')[0]"
                  />
                  <template #help>
                    <span class="text-xs">When does the CFP close?</span>
                  </template>
                </UFormGroup>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UFormGroup label="Conference Start Date" name="conference.startsAt">
                  <UInput
                    v-model="formState.conference.startsAt"
                    type="date"
                    size="lg"
                  />
                  <template #help>
                    <span class="text-xs">When does the event start? (Optional)</span>
                  </template>
                </UFormGroup>

                <UFormGroup label="Conference End Date" name="conference.endsAt">
                  <UInput
                    v-model="formState.conference.endsAt"
                    type="date"
                    size="lg"
                    :min="formState.conference.startsAt || undefined"
                  />
                  <template #help>
                    <span class="text-xs">When does the event end? (Optional)</span>
                  </template>
                </UFormGroup>
              </div>
            </div>

            <!-- Step 3: Topics & Categories -->
            <div v-if="currentStep === 3" class="space-y-4">
              <UFormGroup label="Topics" name="cfp.topics" required>
                <div class="space-y-3">
                  <div v-if="formState.cfp.topics.length > 0" class="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <UBadge
                      v-for="(topic, index) in formState.cfp.topics"
                      :key="index"
                      variant="soft"
                      color="primary"
                      size="lg"
                      class="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                      @click="removeTopic(index)"
                    >
                      {{ topic }}
                      <Icon name="i-heroicons-x-mark" class="w-4 h-4 ml-1" />
                    </UBadge>
                  </div>
                  <USelectMenu
                    v-model="selectedTopic"
                    :options="availableTopics"
                    placeholder="Select topics relevant to this CFP..."
                    searchable
                    searchable-placeholder="Search topics..."
                    size="lg"
                    @update:model-value="addTopicFromSelect"
                  >
                    <template #label>
                      <span class="text-gray-500 flex items-center gap-2">
                        <Icon name="i-heroicons-tag" class="w-5 h-5" />
                        Select topics relevant to this CFP...
                      </span>
                    </template>
                  </USelectMenu>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Select at least one topic. Click on a selected topic to remove it.
                  </p>
                </div>
              </UFormGroup>
            </div>

            <!-- Step 4: Speaker Benefits -->
            <div v-if="currentStep === 4" class="space-y-6">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Select all benefits that apply to selected speakers:
                </p>
                <div class="grid grid-cols-1 gap-4">
                  <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md"
                    :class="[
                      formState.cfp.perks.travel
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    ]"
                  >
                    <UCheckbox
                      v-model="formState.cfp.perks.travel"
                      name="cfp.perks.travel"
                    />
                    <div class="ml-3">
                      <div class="flex items-center gap-2">
                        <Icon name="i-heroicons-paper-airplane" class="w-5 h-5 text-blue-500" />
                        <span class="font-medium text-gray-900 dark:text-white">Travel Covered</span>
                      </div>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Conference covers travel expenses</p>
                    </div>
                  </label>

                  <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md"
                    :class="[
                      formState.cfp.perks.hotel
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    ]"
                  >
                    <UCheckbox
                      v-model="formState.cfp.perks.hotel"
                      name="cfp.perks.hotel"
                    />
                    <div class="ml-3">
                      <div class="flex items-center gap-2">
                        <Icon name="i-heroicons-building-office" class="w-5 h-5 text-purple-500" />
                        <span class="font-medium text-gray-900 dark:text-white">Hotel Covered</span>
                      </div>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Conference covers accommodation</p>
                    </div>
                  </label>

                  <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md"
                    :class="[
                      formState.cfp.perks.honorarium
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    ]"
                  >
                    <UCheckbox
                      v-model="formState.cfp.perks.honorarium"
                      name="cfp.perks.honorarium"
                    />
                    <div class="ml-3">
                      <div class="flex items-center gap-2">
                        <Icon name="i-heroicons-banknotes" class="w-5 h-5 text-green-500" />
                        <span class="font-medium text-gray-900 dark:text-white">Honorarium Provided</span>
                      </div>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Speakers receive payment</p>
                    </div>
                  </label>
                </div>
              </div>

              <UFormGroup label="Additional Notes" name="cfp.notes">
                <UTextarea
                  v-model="formState.cfp.notes"
                  placeholder="Any additional information about the CFP, special requirements, or speaker benefits... (optional)"
                  :rows="4"
                  size="lg"
                />
              </UFormGroup>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <UButton
                v-if="currentStep > 0"
                type="button"
                variant="outline"
                size="lg"
                class="order-2 sm:order-1"
                @click="previousStep"
              >
                <Icon name="i-heroicons-arrow-left" class="w-5 h-5 mr-2" />
                Previous
              </UButton>
              <div v-else class="hidden sm:block"></div>

              <div class="flex gap-2 sm:gap-3 order-1 sm:order-2">
                <UButton
                  type="button"
                  variant="ghost"
                  size="lg"
                  class="flex-1 sm:flex-none"
                  @click="resetForm"
                >
                  Reset
                </UButton>
                <UButton
                  v-if="currentStep < steps.length - 1"
                  type="submit"
                  size="lg"
                  class="flex-1 sm:flex-none"
                >
                  Next
                  <Icon name="i-heroicons-arrow-right" class="w-5 h-5 ml-2" />
                </UButton>
                <UButton
                  v-else
                  type="submit"
                  size="lg"
                  class="flex-1 sm:flex-none"
                  :loading="submitting"
                  color="green"
                >
                  <Icon name="i-heroicons-paper-airplane" class="w-5 h-5 mr-2" />
                  <span class="hidden sm:inline">Submit CFP</span>
                  <span class="sm:hidden">Submit</span>
                </UButton>
              </div>
            </div>
          </div>
        </UForm>
      </UCard>

      <!-- Help Text -->
      <div class="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-4">
        <p>All submissions are reviewed by our team before being published to ensure quality.</p>
      </div>
    </div>

    <!-- Success State -->
    <div v-else class="text-center py-8 sm:py-12 px-4">
      <div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4 sm:mb-6">
        <Icon name="i-heroicons-check-circle" class="w-10 h-10 sm:w-12 sm:h-12 text-green-600 dark:text-green-400" />
      </div>
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
        Thank You for Your Contribution!
      </h2>
      <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto">
        Your CFP submission is being reviewed and will be published soon.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <UButton
          size="lg"
          class="w-full sm:w-auto"
          @click="submitAnother"
        >
          Submit Another CFP
        </UButton>
        <UButton
          to="/search"
          variant="outline"
          size="lg"
          class="w-full sm:w-auto"
        >
          Browse CFPs
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { submitFormSchema } from '../../packages/schemas/zod'
import { Country } from 'country-state-city'
import { TOPICS } from '~/utils/constants'

useHead({
  title: 'Submit CFP - Call for Papers',
  meta: [
    { name: 'description', content: 'Submit a call for papers to help the speaking community discover new opportunities.' }
  ]
})

// Step definitions
const steps = [
  {
    title: 'Basic Info',
    description: 'Tell us about the conference and where to find the CFP'
  },
  {
    title: 'Location',
    description: 'Where will the event take place?'
  },
  {
    title: 'Timeline',
    description: 'When does the CFP open and close?'
  },
  {
    title: 'Topics',
    description: 'What topics are relevant for this CFP?'
  },
  {
    title: 'Benefits',
    description: 'What perks do speakers receive?'
  }
]

const currentStep = ref(0)

// Step schemas for validation
const step0Schema = z.object({
  conference: z.object({
    name: z.string().min(1, 'Required'),
    websiteUrl: z.string().url('Invalid URL')
  }),
  cfp: z.object({
    cfpUrl: z.string().url('Invalid URL')
  })
})

const step1Schema = z.object({
  conference: z.object({
    country: z.string().min(1, 'Required'),
    city: z.string().min(1, 'Required')
  }),
  cfp: z.object({
    format: z.string().min(1, 'Required')
  })
})

const step2Schema = z.object({
  cfp: z.object({
    closesAt: z.string().min(1, 'Required')
  })
})

const step3Schema = z.object({
  cfp: z.object({
    topics: z.array(z.string()).min(1, 'Select at least one topic')
  })
})

const currentStepSchema = computed(() => {
  switch (currentStep.value) {
    case 0: return step0Schema
    case 1: return step1Schema
    case 2: return step2Schema
    case 3: return step3Schema
    default: return z.object({})
  }
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

// Get all countries from the package
const allCountries = Country.getAllCountries()
const countryOptions = allCountries.map(country => ({
  label: country.name,
  value: country.name,
  isoCode: country.isoCode
}))

const DRAFT_KEY = 'cfp_submission_draft'
const DRAFT_STEP_KEY = 'cfp_submission_step'

const formState = reactive({
  conference: {
    name: '',
    websiteUrl: '',
    city: '',
    country: '',
    platform: '',
    startsAt: '',
    endsAt: ''
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
const saveState = ref<'saving' | 'saved' | 'idle'>('idle')
const showSaveIndicator = ref(false)
const draftRestored = ref(false)

let saveTimeout: NodeJS.Timeout | null = null
let indicatorTimeout: NodeJS.Timeout | null = null

// Available topics excluding already selected ones
const availableTopics = computed(() => {
  return TOPICS.filter(topic => !formState.cfp.topics.includes(topic))
})

// Auto-save functionality
function saveDraft() {
  if (saveTimeout) clearTimeout(saveTimeout)
  if (indicatorTimeout) clearTimeout(indicatorTimeout)

  saveState.value = 'saving'
  showSaveIndicator.value = true

  saveTimeout = setTimeout(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formState))
      localStorage.setItem(DRAFT_STEP_KEY, currentStep.value.toString())
      saveState.value = 'saved'

      // Hide indicator after 2 seconds
      indicatorTimeout = setTimeout(() => {
        showSaveIndicator.value = false
        saveState.value = 'idle'
      }, 2000)
    } catch (error) {
      console.error('Failed to save draft:', error)
      saveState.value = 'idle'
      showSaveIndicator.value = false
    }
  }, 500) // Debounce for 500ms
}

function loadDraft() {
  try {
    const savedDraft = localStorage.getItem(DRAFT_KEY)
    const savedStep = localStorage.getItem(DRAFT_STEP_KEY)

    if (savedDraft) {
      const draft = JSON.parse(savedDraft)
      Object.assign(formState, draft)

      if (savedStep) {
        currentStep.value = parseInt(savedStep)
      }

      draftRestored.value = true

      // Hide the restored message after 5 seconds
      setTimeout(() => {
        draftRestored.value = false
      }, 5000)
    }
  } catch (error) {
    console.error('Failed to load draft:', error)
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY)
    localStorage.removeItem(DRAFT_STEP_KEY)
  } catch (error) {
    console.error('Failed to clear draft:', error)
  }
}

// Watch for changes and auto-save
watch(formState, () => {
  if (!submitSuccess.value) {
    saveDraft()
  }
}, { deep: true })

watch(currentStep, () => {
  if (!submitSuccess.value) {
    saveDraft()
  }
})

// Load draft on mount
onMounted(() => {
  loadDraft()
})

function onCountryChange(countryName: string) {
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

function handleStepSubmit() {
  if (currentStep.value < steps.length - 1) {
    nextStep()
  } else {
    submitForm()
  }
}

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function previousStep() {
  if (currentStep.value > 0) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function resetForm() {
  Object.assign(formState, {
    conference: {
      name: '',
      websiteUrl: '',
      city: '',
      country: '',
      platform: '',
      startsAt: '',
      endsAt: ''
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
  currentStep.value = 0
  submitSuccess.value = false
  submitError.value = ''
  clearDraft()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function submitAnother() {
  resetForm()
}

async function submitForm() {
  submitting.value = true
  submitError.value = ''

  try {
    await $fetch('/api/submit', {
      method: 'POST',
      body: formState
    })

    submitSuccess.value = true
    clearDraft() // Clear draft on successful submission
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error: any) {
    submitError.value = error.data?.error || 'An error occurred while submitting the CFP'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } finally {
    submitting.value = false
  }
}
</script>
