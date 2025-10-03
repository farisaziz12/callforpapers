export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${config.public.siteUrl}/api/feeds/sitemap.xml`

  setHeader(event, 'content-type', 'text/plain')
  return robotsTxt
})