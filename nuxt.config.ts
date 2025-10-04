// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/auth/callback',
      exclude: ['/', '/search', '/search/map', '/cfp/*', '/submit', '/login', '/auth/*']
    }
  },
  runtimeConfig: {
    adminAccessToken: process.env.ADMIN_ACCESS_TOKEN || 'dev-admin',
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Call for Papers - Find Speaking Opportunities Worldwide',
      meta: [
        { name: 'description', content: 'Discover and track call for papers (CFP) opportunities from conferences, workshops, and meetups worldwide. Find your next speaking stage and share your expertise.' },
        { name: 'keywords', content: 'call for papers, CFP, speaking opportunities, tech conferences, developer conferences, conference speaking, CFP tracker, speaker submissions, tech talks' },
        { name: 'author', content: 'Call for Papers' },
        { name: 'robots', content: 'index, follow' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Call for Papers - Find Speaking Opportunities Worldwide' },
        { property: 'og:description', content: 'Discover and track CFP opportunities from conferences, workshops, and meetups worldwide.' },
        { property: 'og:site_name', content: 'Call for Papers' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Call for Papers - Find Speaking Opportunities Worldwide' },
        { name: 'twitter:description', content: 'Discover and track CFP opportunities from conferences, workshops, and meetups worldwide.' },

        // Mobile
        { name: 'theme-color', content: '#3b82f6' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: process.env.SITE_URL || 'http://localhost:3000' }
      ]
    }
  },
  sitemap: {
    hostname: process.env.SITE_URL || 'http://localhost:3000',
    gzip: true,
    routes: async () => {
      // Dynamic routes will be added here
      return []
    }
  },
  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: `${process.env.SITE_URL || 'http://localhost:3000'}/sitemap.xml`
  },
  routeRules: {
    '/': { ssr: true, prerender: true },
    '/search': { ssr: true },
    '/search/map': { ssr: true },
    '/submit': { ssr: true },
    '/cfp/**': { isr: 3600 }, // Incremental Static Regeneration every 1 hour
    '/countries/**': { ssr: true },
    '/api/**': { cors: true }
  },
  nitro: {
    preset: 'vercel',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/search', '/submit']
    }
  },
  experimental: {
    payloadExtraction: true
  }
})
