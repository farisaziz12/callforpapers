export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()


  // If not authenticated, redirect to login
  if (!user.value) {
    return navigateTo('/admin/login')
  }

  // Check if user is an admin
  const { data: adminData, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', user.value.sub)
    .single()

  if (error || !adminData) {
    // User is not an admin, sign them out and redirect
    await supabase.auth.signOut()
    return navigateTo('/admin/login')
  }
})