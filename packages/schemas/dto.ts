export interface CfpCardDTO {
  id: string
  slug: string
  title: string
  city: string
  country: string
  topics: string[]
  closesAt: string
  format: 'conference' | 'workshop' | 'meetup' | 'online'
  perks: {
    travel: boolean
    hotel: boolean
    honorarium: boolean
  }
  lastUpdatedAt: string
  conferenceStartsAt?: string
  conferenceEndsAt?: string
}

export interface CfpDetailDTO extends CfpCardDTO {
  websiteUrl: string
  cfpUrl: string
  timeline: {
    opensAt?: string
    closesAt: string
  }
  platform?: string
  notes?: string
  conferenceStartsAt?: string
  conferenceEndsAt?: string
}

export interface ModerationItemDTO {
  id: string
  submittedAt: string
  payload: {
    conference: {
      name: string
      websiteUrl: string
      city: string
      country: string
      platform?: string
    }
    cfp: {
      title: string
      cfpUrl: string
      topics: string[]
      format: 'conference' | 'workshop' | 'meetup' | 'online'
      opensAt?: string
      closesAt: string
      perks: {
        travel: boolean
        hotel: boolean
        honorarium: boolean
      }
      notes?: string
    }
  }
}

export interface SavedSearchDTO {
  id: string
  name: string
  filters: SearchParams
}

export interface SearchParams {
  q?: string
  country?: string
  topic?: string
  format?: 'conference' | 'workshop' | 'meetup' | 'online'
  closesBefore?: string
  page?: number
  pageSize?: number
}

export interface SearchResult {
  hits: CfpCardDTO[]
  total: number
  page: number
  pageSize: number
}

// User Profile
export interface UserProfileDTO {
  id: string
  email: string
  fullName?: string
  bio?: string
  avatarUrl?: string
  websiteUrl?: string
  twitterHandle?: string
  linkedinUrl?: string
  githubUrl?: string
  speakingExperience?: 'beginner' | 'intermediate' | 'expert'
  preferredTopics: string[]
  preferredFormats: string[]
  willingToTravel: boolean
  availableForSpeaking: boolean
  createdAt: string
  updatedAt: string
}

// User Submission Tracker
export type SubmissionStatus = 'interested' | 'applied' | 'accepted' | 'rejected' | 'withdrawn' | 'waitlisted'

export interface UserSubmissionDTO {
  id: string
  userId: string
  cfpId: string
  status: SubmissionStatus
  talkTitle?: string
  talkAbstract?: string
  appliedAt?: string
  responseReceivedAt?: string
  notes?: string
  createdAt: string
  updatedAt: string
  // Populated fields
  cfp?: CfpCardDTO
}

export interface CreateSubmissionDTO {
  cfpId: string
  status: SubmissionStatus
  talkTitle?: string
  talkAbstract?: string
  appliedAt?: string
  notes?: string
}

// Conference Ratings
export interface ConferenceRatingDTO {
  id: string
  userId: string
  cfpId: string
  rating: number // 1-5
  reviewTitle?: string
  reviewText?: string
  wouldRecommend: boolean
  organizerResponsiveness?: number // 1-5
  speakerExperience?: number // 1-5
  createdAt: string
  updatedAt: string
  // Populated fields
  user?: {
    fullName?: string
    avatarUrl?: string
  }
}

export interface CreateRatingDTO {
  cfpId: string
  rating: number
  reviewTitle?: string
  reviewText?: string
  wouldRecommend?: boolean
  organizerResponsiveness?: number
  speakerExperience?: number
}

// Conference Intelligence/Metadata
export interface ConferenceMetadataDTO {
  id: string
  cfpId: string
  totalSpeakersCount: number
  estimatedAcceptanceRate?: number
  averageResponseTimeDays?: number
  attendeeCount?: number
  conferenceSize?: 'small' | 'medium' | 'large'
  hasCodeOfConduct: boolean
  hasDiversityInitiative: boolean
  recordsTalks: boolean
  providesSlidesPlatform: boolean
  previousYearsData?: Record<string, any>
  verified: boolean
  // Aggregated from ratings
  averageRating?: number
  totalRatings?: number
}

// Recommendations
export interface UserRecommendationDTO {
  id: string
  userId: string
  cfpId: string
  score: number // 0-100
  reasons: string[]
  createdAt: string
  cfp?: CfpCardDTO
}

// User Talks Library
export interface UserTalkDTO {
  id: string
  userId: string
  title: string
  abstract: string
  description?: string
  topics: string[]
  durationMinutes?: number
  slidesUrl?: string
  videoUrl?: string
  githubUrl?: string
  isActive: boolean
  timesSubmitted: number
  timesAccepted: number
  createdAt: string
  updatedAt: string
}

export interface CreateTalkDTO {
  title: string
  abstract: string
  description?: string
  topics?: string[]
  durationMinutes?: number
  slidesUrl?: string
  videoUrl?: string
  githubUrl?: string
}

// Notification Preferences
export interface NotificationPreferencesDTO {
  id: string
  emailNotifications: boolean
  deadlineReminders: boolean
  newCfpAlerts: boolean
  savedSearchDigest: boolean
  digestFrequency: 'daily' | 'weekly' | 'monthly'
  pushNotifications: boolean
}

// Dashboard Summary
export interface DashboardSummaryDTO {
  user: UserProfileDTO
  stats: {
    totalSubmissions: number
    acceptedSubmissions: number
    pendingSubmissions: number
    savedSearches: number
    savedCfps: number
  }
  recentSubmissions: UserSubmissionDTO[]
  recommendations: UserRecommendationDTO[]
  closingThisWeek: CfpCardDTO[]
}

// Enhanced CfpDetail with Intelligence
export interface CfpDetailWithIntelligenceDTO extends CfpDetailDTO {
  metadata?: ConferenceMetadataDTO
  ratings?: ConferenceRatingDTO[]
  userRating?: ConferenceRatingDTO
  userSubmission?: UserSubmissionDTO
  averageRating?: number
  totalRatings?: number
}

// Map View
export interface MapSearchParams extends SearchParams {
  bounds?: {
    north: number
    south: number
    east: number
    west: number
  }
}

export interface GeoLocationDTO {
  lat: number
  lng: number
  city: string
  country: string
}

export interface CfpWithLocationDTO extends CfpCardDTO {
  location: GeoLocationDTO
}