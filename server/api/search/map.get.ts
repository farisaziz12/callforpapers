import { getSupabaseClient } from '../../lib/supabase'
import type { CfpWithLocationDTO } from '../../../packages/schemas/dto'

// Simple city geocoding - in production, you'd use a geocoding service
const CITY_COORDINATES: Record<string, { lat: number, lng: number }> = {
  // US Cities
  'San Francisco': { lat: 37.7749, lng: -122.4194 },
  'New York': { lat: 40.7128, lng: -74.0060 },
  'Los Angeles': { lat: 34.0522, lng: -118.2437 },
  'Chicago': { lat: 41.8781, lng: -87.6298 },
  'Austin': { lat: 30.2672, lng: -97.7431 },
  'Seattle': { lat: 47.6062, lng: -122.3321 },
  'Boston': { lat: 42.3601, lng: -71.0589 },
  'Portland': { lat: 45.5155, lng: -122.6789 },

  // European Cities
  'London': { lat: 51.5074, lng: -0.1278 },
  'Paris': { lat: 48.8566, lng: 2.3522 },
  'Berlin': { lat: 52.5200, lng: 13.4050 },
  'Amsterdam': { lat: 52.3676, lng: 4.9041 },
  'Barcelona': { lat: 41.3851, lng: 2.1734 },
  'Madrid': { lat: 40.4168, lng: -3.7038 },
  'Rome': { lat: 41.9028, lng: 12.4964 },
  'Prague': { lat: 50.0755, lng: 14.4378 },
  'Vienna': { lat: 48.2082, lng: 16.3738 },
  'Copenhagen': { lat: 55.6761, lng: 12.5683 },

  // Asian Cities
  'Tokyo': { lat: 35.6762, lng: 139.6503 },
  'Singapore': { lat: 1.3521, lng: 103.8198 },
  'Hong Kong': { lat: 22.3193, lng: 114.1694 },
  'Seoul': { lat: 37.5665, lng: 126.9780 },
  'Bangkok': { lat: 13.7563, lng: 100.5018 },
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Delhi': { lat: 28.7041, lng: 77.1025 },
  'Bangalore': { lat: 12.9716, lng: 77.5946 },

  // Other Cities
  'Toronto': { lat: 43.6532, lng: -79.3832 },
  'Vancouver': { lat: 49.2827, lng: -123.1207 },
  'Sydney': { lat: -33.8688, lng: 151.2093 },
  'Melbourne': { lat: -37.8136, lng: 144.9631 },
  'Tel Aviv': { lat: 32.0853, lng: 34.7818 },
  'Dubai': { lat: 25.2048, lng: 55.2708 },
  'São Paulo': { lat: -23.5558, lng: -46.6396 },
  'Mexico City': { lat: 19.4326, lng: -99.1332 }
}

function getCityCoordinates(city: string): { lat: number, lng: number } | null {
  // Try exact match first
  if (CITY_COORDINATES[city]) {
    return CITY_COORDINATES[city]
  }

  // Try case-insensitive match
  const key = Object.keys(CITY_COORDINATES).find(
    k => k.toLowerCase() === city.toLowerCase()
  )

  if (key) {
    return CITY_COORDINATES[key]
  }

  // Default to null (will be filtered out)
  return null
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const supabase = await getSupabaseClient(event)

  // Build base query
  let dbQuery = supabase
    .from('cfps')
    .select('*')
    .gte('closes_at', new Date().toISOString())

  // Apply filters
  if (query.q) {
    const searchTerm = query.q as string
    dbQuery = dbQuery.or(`title.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,country.ilike.%${searchTerm}%`)
  }

  if (query.country) {
    dbQuery = dbQuery.eq('country', query.country as string)
  }

  if (query.topic) {
    dbQuery = dbQuery.contains('topics', [query.topic as string])
  }

  if (query.format) {
    dbQuery = dbQuery.eq('format', query.format as string)
  }

  // Fetch CFPs
  const { data: cfps, error } = await dbQuery.order('closes_at', { ascending: true }).limit(100)

  if (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to fetch CFPs: ${error.message}`
    })
  }

  // Add geolocation to each CFP
  const cfpsWithLocation: CfpWithLocationDTO[] = (cfps || [])
    .map(cfp => {
      const coords = getCityCoordinates(cfp.city)

      if (!coords) return null

      return {
        id: cfp.id,
        slug: cfp.slug,
        title: cfp.title,
        city: cfp.city,
        country: cfp.country,
        topics: cfp.topics,
        closesAt: cfp.closes_at,
        format: cfp.format,
        perks: {
          travel: cfp.perks_travel,
          hotel: cfp.perks_hotel,
          honorarium: cfp.perks_honorarium
        },
        lastUpdatedAt: cfp.last_updated_at,
        location: {
          lat: coords.lat,
          lng: coords.lng,
          city: cfp.city,
          country: cfp.country
        }
      }
    })
    .filter((cfp): cfp is CfpWithLocationDTO => cfp !== null)

  return cfpsWithLocation
})
