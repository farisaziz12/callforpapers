import { getSupabaseClient } from '../../../lib/supabase'

/**
 * Generates an iCalendar (.ics) file for a CFP deadline
 */
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const supabase = await getSupabaseClient(event)

  // Fetch CFP details
  const { data: cfp, error } = await supabase
    .from('cfps')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !cfp) {
    throw createError({
      statusCode: 404,
      message: 'CFP not found'
    })
  }

  // Generate unique ID for the event
  const uid = `cfp-${cfp.id}@callforpapers.dev`
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const deadline = new Date(cfp.closes_at).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  // Create iCalendar content
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Call for Papers//CFP Tracker//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${deadline}`,
    `DTEND:${deadline}`,
    `SUMMARY:CFP Deadline: ${cfp.title}`,
    `DESCRIPTION:Call for Papers deadline for ${cfp.title} in ${cfp.city}, ${cfp.country}.\\n\\nSubmit your proposal: ${cfp.cfp_url}\\n\\nMore details: ${process.env.SITE_URL || 'http://localhost:3000'}/cfp/${cfp.slug}`,
    `LOCATION:${cfp.city}, ${cfp.country}`,
    `URL:${cfp.cfp_url}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1W', // 1 week before
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: CFP for ${cfp.title} closes in 1 week`,
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-P3D', // 3 days before
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: CFP for ${cfp.title} closes in 3 days`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  // Set response headers for calendar download
  setResponseHeaders(event, {
    'Content-Type': 'text/calendar; charset=utf-8',
    'Content-Disposition': `attachment; filename="cfp-${slug}.ics"`
  })

  return icsContent
})
