import { serverSupabaseUser } from '#supabase/server'
import { getSupabaseClient } from '../../lib/supabase'
import type { UserTalkDTO } from '../../../packages/schemas/dto'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const supabase = await getSupabaseClient(event)

  // Fetch user's talks
  const { data, error } = await supabase
    .from('user_talks')
    .select('*')
    .eq('user_id', user.sub)
    .order('created_at', { ascending: false })

  if (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to fetch talks: ${error.message}`
    })
  }

  const talks: UserTalkDTO[] = (data || []).map(talk => ({
    id: talk.id,
    userId: talk.user_id,
    title: talk.title,
    abstract: talk.abstract,
    description: talk.description || undefined,
    topics: talk.topics || [],
    durationMinutes: talk.duration_minutes || undefined,
    slidesUrl: talk.slides_url || undefined,
    videoUrl: talk.video_url || undefined,
    githubUrl: talk.github_url || undefined,
    isActive: talk.is_active ?? true,
    timesSubmitted: talk.times_submitted || 0,
    timesAccepted: talk.times_accepted || 0,
    createdAt: talk.created_at,
    updatedAt: talk.updated_at
  }))

  return talks
})
