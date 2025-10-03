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