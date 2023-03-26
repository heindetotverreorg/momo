export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/admin' || to.path === '/admin/') {
    return navigateTo('/admin/dashboard')
  }
})