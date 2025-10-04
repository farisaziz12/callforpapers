import { z } from 'zod'

export const searchParamsSchema = z.object({
  q: z.string().optional(),
  country: z.string().optional(),
  topic: z.string().optional(),
  format: z.enum(['conference', 'workshop', 'meetup', 'online', '']).optional(),
  closesBefore: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(12),
})

export const submitFormSchema = z.object({
  conference: z.object({
    name: z.string().min(1, 'Conference name is required'),
    websiteUrl: z.string().url('Valid website URL is required'),
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
    platform: z.string().optional(),
  }),
  cfp: z.object({
    cfpUrl: z.string().url('Valid CFP URL is required'),
    topics: z.array(z.string()).min(1, 'At least one topic is required'),
    format: z.enum(['conference', 'workshop', 'meetup', 'online']),
    opensAt: z.string().optional(),
    closesAt: z.string().min(1, 'Closing date is required'),
    perks: z.object({
      travel: z.boolean().default(false),
      hotel: z.boolean().default(false),
      honorarium: z.boolean().default(false),
    }),
    notes: z.string().optional(),
  }),
})

export const savedSearchSchema = z.object({
  name: z.string().min(1, 'Search name is required'),
  filters: searchParamsSchema,
})

// User Profile
export const userProfileSchema = z.object({
  fullName: z.string().optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional().or(z.literal('')),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  twitterHandle: z.string().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  speakingExperience: z.enum(['beginner', 'intermediate', 'expert']).optional(),
  preferredTopics: z.array(z.string()).default([]),
  preferredFormats: z.array(z.string()).default([]),
  willingToTravel: z.boolean().default(true),
  availableForSpeaking: z.boolean().default(true),
})

// User Submission
export const submissionStatusSchema = z.enum([
  'interested',
  'applied',
  'accepted',
  'rejected',
  'withdrawn',
  'waitlisted'
])

export const createSubmissionSchema = z.object({
  cfpId: z.string().uuid(),
  status: submissionStatusSchema,
  talkTitle: z.string().min(1, 'Talk title is required'),
  talkAbstract: z.string().optional(),
  appliedAt: z.string().optional(),
  notes: z.string().optional(),
})

export const updateSubmissionSchema = z.object({
  status: submissionStatusSchema.optional(),
  talkTitle: z.string().optional(),
  talkAbstract: z.string().optional(),
  appliedAt: z.string().optional(),
  responseReceivedAt: z.string().optional(),
  notes: z.string().optional(),
})

// Conference Rating
export const createRatingSchema = z.object({
  cfpId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  reviewTitle: z.string().max(100).optional(),
  reviewText: z.string().max(1000).optional(),
  wouldRecommend: z.boolean().default(true),
  organizerResponsiveness: z.number().int().min(1).max(5).optional(),
  speakerExperience: z.number().int().min(1).max(5).optional(),
})

export const updateRatingSchema = createRatingSchema.partial().omit({ cfpId: true })

// User Talk Library
export const createTalkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  abstract: z.string().min(1, 'Abstract is required'),
  description: z.string().optional(),
  topics: z.array(z.string()).default([]),
  durationMinutes: z.number().int().min(1).optional(),
  slidesUrl: z.string().url().optional().or(z.literal('')),
  videoUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
})

export const updateTalkSchema = createTalkSchema.partial()

// Notification Preferences
export const notificationPreferencesSchema = z.object({
  emailNotifications: z.boolean().default(true),
  deadlineReminders: z.boolean().default(true),
  newCfpAlerts: z.boolean().default(true),
  savedSearchDigest: z.boolean().default(true),
  digestFrequency: z.enum(['daily', 'weekly', 'monthly']).default('weekly'),
  pushNotifications: z.boolean().default(false),
})

// Map Search
export const mapSearchParamsSchema = searchParamsSchema.extend({
  bounds: z.object({
    north: z.number(),
    south: z.number(),
    east: z.number(),
    west: z.number(),
  }).optional(),
})