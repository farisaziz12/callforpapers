import type { Database } from './database.types'
import { serverSupabaseClient, serverSupabaseServiceRole } from '#supabase/server'
import type { H3Event } from 'h3'

export async function getSupabaseClient(event: H3Event) {
  return serverSupabaseClient<Database>(event)
}

export async function getSupabaseAdminClient(event: H3Event) {
  return serverSupabaseServiceRole<Database>(event)
}
