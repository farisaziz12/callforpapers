import type { ICfpDirectory } from '../interfaces/cfp-directory'
import type { CfpCardDTO, CfpDetailDTO, ModerationItemDTO, SearchParams } from '../../../packages/schemas/dto'
import type { Database } from '../../lib/database.types'
import type { H3Event } from 'h3'
import { getSupabaseClient, getSupabaseAdminClient } from '../../lib/supabase'

type DbCfp = Database['public']['Tables']['cfps']['Row']
type DbCfpInsert = Database['public']['Tables']['cfps']['Insert']
type DbModeration = Database['public']['Tables']['moderation_queue']['Row']
type DbModerationInsert = Database['public']['Tables']['moderation_queue']['Insert']

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

function dbCfpToDTO(dbCfp: DbCfp): CfpDetailDTO {
  return {
    id: dbCfp.id,
    slug: dbCfp.slug,
    title: dbCfp.title,
    city: dbCfp.city,
    country: dbCfp.country,
    topics: dbCfp.topics,
    closesAt: dbCfp.closes_at,
    format: dbCfp.format,
    perks: {
      travel: dbCfp.perks_travel,
      hotel: dbCfp.perks_hotel,
      honorarium: dbCfp.perks_honorarium,
    },
    lastUpdatedAt: dbCfp.last_updated_at,
    websiteUrl: dbCfp.website_url,
    cfpUrl: dbCfp.cfp_url,
    timeline: {
      opensAt: dbCfp.timeline_opens_at ?? undefined,
      closesAt: dbCfp.timeline_closes_at,
    },
    platform: dbCfp.platform ?? undefined,
    notes: dbCfp.notes ?? undefined,
    conferenceStartsAt: dbCfp.conference_starts_at ?? undefined,
    conferenceEndsAt: dbCfp.conference_ends_at ?? undefined,
  }
}

function dbModerationToDTO(dbModeration: DbModeration): ModerationItemDTO {
  return {
    id: dbModeration.id,
    submittedAt: dbModeration.submitted_at,
    payload: {
      conference: {
        name: dbModeration.conference_name,
        websiteUrl: dbModeration.conference_website_url,
        city: dbModeration.conference_city,
        country: dbModeration.conference_country,
        platform: dbModeration.conference_platform ?? undefined,
      },
      cfp: {
        title: dbModeration.cfp_title,
        cfpUrl: dbModeration.cfp_url,
        topics: dbModeration.cfp_topics,
        format: dbModeration.cfp_format,
        opensAt: dbModeration.cfp_opens_at ?? undefined,
        closesAt: dbModeration.cfp_closes_at,
        perks: {
          travel: dbModeration.cfp_perks_travel,
          hotel: dbModeration.cfp_perks_hotel,
          honorarium: dbModeration.cfp_perks_honorarium,
        },
        notes: dbModeration.cfp_notes ?? undefined,
      },
    },
  }
}

export class SupabaseCfpDirectory implements ICfpDirectory {
  constructor(private event: H3Event) {}

  async list(params: SearchParams): Promise<{ items: CfpCardDTO[]; total: number }> {
    const supabase = await getSupabaseClient(this.event)
    let query = supabase
      .from('cfps')
      .select('*', { count: 'exact' })

    // Text search
    if (params.q) {
      const searchTerm = params.q.toLowerCase()
      query = query.or(`title.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,country.ilike.%${searchTerm}%,topics.cs.{${searchTerm}}`)
    }

    // Country filter
    if (params.country) {
      query = query.eq('country', params.country)
    }

    // Topic filter
    if (params.topic) {
      query = query.contains('topics', [params.topic])
    }

    // Format filter
    if (params.format) {
      query = query.eq('format', params.format)
    }

    // Closes before filter
    if (params.closesBefore) {
      query = query.lte('closes_at', params.closesBefore)
    }

    // Order by closes_at
    query = query.order('closes_at', { ascending: true })

    // Pagination
    const page = params.page || 1
    const pageSize = params.pageSize || 12
    const start = (page - 1) * pageSize
    const end = start + pageSize - 1

    query = query.range(start, end)

    const { data, error, count } = await query

    if (error) {
      throw new Error(`Failed to fetch CFPs: ${error.message}`)
    }

    const items = (data || []).map(dbCfpToDTO)
    return { items, total: count || 0 }
  }

  async getBySlug(slug: string): Promise<CfpDetailDTO | null> {
    const supabase = await getSupabaseClient(this.event)
    const { data, error } = await supabase
      .from('cfps')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw new Error(`Failed to fetch CFP: ${error.message}`)
    }

    return dbCfpToDTO(data)
  }

  async approveModeration(id: string): Promise<void> {
    const supabaseAdmin = await getSupabaseAdminClient(this.event)
    // Get moderation item
    const { data: moderationItem, error: fetchError } = await supabaseAdmin
      .from('moderation_queue')
      .select('*')
      .eq('id', id)
      .eq('status', 'pending')
      .single()

    if (fetchError) {
      throw new Error(`Failed to fetch moderation item: ${fetchError.message}`)
    }

    if (!moderationItem) {
      throw new Error('Moderation item not found or already processed')
    }

    // Create CFP from moderation item
    const newCfp: DbCfpInsert = {
      slug: generateSlug(moderationItem.cfp_title),
      title: moderationItem.cfp_title,
      city: moderationItem.conference_city,
      country: moderationItem.conference_country,
      topics: moderationItem.cfp_topics,
      closes_at: moderationItem.cfp_closes_at,
      format: moderationItem.cfp_format,
      perks_travel: moderationItem.cfp_perks_travel,
      perks_hotel: moderationItem.cfp_perks_hotel,
      perks_honorarium: moderationItem.cfp_perks_honorarium,
      website_url: moderationItem.conference_website_url,
      cfp_url: moderationItem.cfp_url,
      timeline_opens_at: moderationItem.cfp_opens_at,
      timeline_closes_at: moderationItem.cfp_closes_at,
      platform: moderationItem.conference_platform,
      notes: moderationItem.cfp_notes,
      conference_starts_at: moderationItem.conference_starts_at,
      conference_ends_at: moderationItem.conference_ends_at,
    }

    // Insert CFP
    const { error: insertError } = await supabaseAdmin
      .from('cfps')
      .insert(newCfp)

    if (insertError) {
      throw new Error(`Failed to create CFP: ${insertError.message}`)
    }

    // Update moderation status
    const { error: updateError } = await supabaseAdmin
      .from('moderation_queue')
      .update({ status: 'approved' })
      .eq('id', id)

    if (updateError) {
      throw new Error(`Failed to update moderation status: ${updateError.message}`)
    }
  }

  async rejectModeration(id: string): Promise<void> {
    const supabaseAdmin = await getSupabaseAdminClient(this.event)

    // Update moderation status to rejected
    const { error: updateError } = await supabaseAdmin
      .from('moderation_queue')
      .update({ status: 'rejected' })
      .eq('id', id)
      .eq('status', 'pending')

    if (updateError) {
      throw new Error(`Failed to reject moderation item: ${updateError.message}`)
    }
  }

  async createModeration(payload: any): Promise<{ id: string }> {
    const supabaseAdmin = await getSupabaseAdminClient(this.event)
    const moderationInsert: DbModerationInsert = {
      conference_name: payload.conference.name,
      conference_website_url: payload.conference.websiteUrl,
      conference_city: payload.conference.city,
      conference_country: payload.conference.country,
      conference_platform: payload.conference.platform || null,
      conference_starts_at: payload.conference.startsAt || null,
      conference_ends_at: payload.conference.endsAt || null,
      cfp_title: payload.conference.name, // Use conference name as CFP title
      cfp_url: payload.cfp.cfpUrl,
      cfp_topics: payload.cfp.topics,
      cfp_format: payload.cfp.format,
      cfp_opens_at: payload.cfp.opensAt || null,
      cfp_closes_at: payload.cfp.closesAt,
      cfp_perks_travel: payload.cfp.perks.travel,
      cfp_perks_hotel: payload.cfp.perks.hotel,
      cfp_perks_honorarium: payload.cfp.perks.honorarium,
      cfp_notes: payload.cfp.notes || null,
    }

    const { data, error } = await supabaseAdmin
      .from('moderation_queue')
      .insert(moderationInsert)
      .select('id')
      .single()

    if (error) {
      throw new Error(`Failed to create moderation item: ${error.message}`)
    }

    return { id: data.id }
  }

  async listModeration(): Promise<ModerationItemDTO[]> {
    const supabaseAdmin = await getSupabaseAdminClient(this.event)
    const { data, error } = await supabaseAdmin
      .from('moderation_queue')
      .select('*')
      .eq('status', 'pending')
      .order('submitted_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch moderation queue: ${error.message}`)
    }

    return (data || []).map(dbModerationToDTO)
  }

  async deleteCfp(id: string): Promise<void> {
    const supabaseAdmin = await getSupabaseAdminClient(this.event)

    const { error } = await supabaseAdmin
      .from('cfps')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(`Failed to delete CFP: ${error.message}`)
    }
  }

  async updateCfp(id: string, data: Partial<CfpDetailDTO>): Promise<void> {
    const supabaseAdmin = await getSupabaseAdminClient(this.event)

    // Map DTO fields to database columns
    const updateData: Partial<DbCfpInsert> = {}

    if (data.title !== undefined) updateData.title = data.title
    if (data.city !== undefined) updateData.city = data.city
    if (data.country !== undefined) updateData.country = data.country
    if (data.topics !== undefined) updateData.topics = data.topics
    if (data.closesAt !== undefined) updateData.closes_at = data.closesAt
    if (data.format !== undefined) updateData.format = data.format
    if (data.perks?.travel !== undefined) updateData.perks_travel = data.perks.travel
    if (data.perks?.hotel !== undefined) updateData.perks_hotel = data.perks.hotel
    if (data.perks?.honorarium !== undefined) updateData.perks_honorarium = data.perks.honorarium
    if (data.websiteUrl !== undefined) updateData.website_url = data.websiteUrl
    if (data.cfpUrl !== undefined) updateData.cfp_url = data.cfpUrl
    if (data.timeline?.opensAt !== undefined) updateData.timeline_opens_at = data.timeline.opensAt ? data.timeline.opensAt : null
    if (data.timeline?.closesAt !== undefined) updateData.timeline_closes_at = data.timeline.closesAt ? data.timeline.closesAt : null
    if (data.platform !== undefined) updateData.platform = data.platform
    if (data.notes !== undefined) updateData.notes = data.notes
    if (data.conferenceStartsAt !== undefined) updateData.conference_starts_at = data.conferenceStartsAt ? data.conferenceStartsAt : null
    if (data.conferenceEndsAt !== undefined) updateData.conference_ends_at = data.conferenceEndsAt ? data.conferenceEndsAt : null

    // Update slug if title changed
    if (data.title) {
      updateData.slug = generateSlug(data.title)
    }

    const { error } = await supabaseAdmin
      .from('cfps')
      .update(updateData)
      .eq('id', id)

    if (error) {
      throw new Error(`Failed to update CFP: ${error.message}`)
    }
  }

  async getStats(): Promise<any> {
    const supabaseAdmin = await getSupabaseAdminClient(this.event)

    // Get pending count
    const { count: pendingCount } = await supabaseAdmin
      .from('moderation_queue')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    // Get total approved count
    const { count: totalApproved } = await supabaseAdmin
      .from('cfps')
      .select('*', { count: 'exact', head: true })

    // Calculate dates for this week and this month
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    // Get CFPs closing this week
    const { count: thisWeek } = await supabaseAdmin
      .from('cfps')
      .select('*', { count: 'exact', head: true })
      .gte('closes_at', now.toISOString())
      .lte('closes_at', new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString())

    // Get CFPs closing this month
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    const { count: thisMonth } = await supabaseAdmin
      .from('cfps')
      .select('*', { count: 'exact', head: true })
      .gte('closes_at', now.toISOString())
      .lt('closes_at', nextMonth.toISOString())

    return {
      pendingCount: pendingCount || 0,
      totalApproved: totalApproved || 0,
      thisWeek: thisWeek || 0,
      thisMonth: thisMonth || 0,
    }
  }

  async refresh(): Promise<void> {
    // This method is a no-op for Supabase since data is always fresh
    // You could implement cache invalidation here if needed
  }
}
