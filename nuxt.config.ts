// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase'
  ],
  supabase: {
    redirectOptions: {
      login: '/admin/login',
      callback: '/admin/auth/callback',
      exclude: ['/', '/search', '/cfp/*', '/submit']
    }
  },
  runtimeConfig: {
    adminAccessToken: process.env.ADMIN_ACCESS_TOKEN || 'dev-admin',
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    }
  },
  routeRules: {
    '/': { ssr: true },
    '/search': { ssr: true },
    '/cfp/**': { ssr: true },
    '/api/**': { cors: true }
  },
  nitro: {
    preset: 'vercel'
  }
})
