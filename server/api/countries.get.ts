import { getSupabaseClient } from '../lib/supabase'

interface CountryStats {
  country: string
  count: number
}

export default defineEventHandler(async (event) => {
  const supabase = await getSupabaseClient(event)

  // Get all active CFPs with country grouping
  const { data: cfps, error } = await supabase
    .from('cfps')
    .select('country')
    .gte('closes_at', new Date().toISOString())

  if (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to fetch countries: ${error.message}`
    })
  }

  // Count CFPs per country
  const countryCounts: Record<string, number> = {}

  cfps?.forEach(cfp => {
    if (cfp.country) {
      countryCounts[cfp.country] = (countryCounts[cfp.country] || 0) + 1
    }
  })

  // Convert to array and sort by count
  const countries: CountryStats[] = Object.entries(countryCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)

  return countries
})
