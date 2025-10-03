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