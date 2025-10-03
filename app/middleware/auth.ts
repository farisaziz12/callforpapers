export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()

  // If not authenticated, redirect to login
  if (!user.value) {
    return navigateTo('/login')
  }
})
