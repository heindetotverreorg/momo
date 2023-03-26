import { useCookie } from '#app'
import { verifyToken } from '~~/server/utils/verifyToken'

export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie('momo:token')

  if (process.server) {
    console.log(`auth check middleware: SERVER > path is ${to.path}`)
  }
  if (process.client) {
    console.log(`auth check middleware: CLIENT > path is ${to.path}`)
  }

  if (token.value) {
    const isVerifiedTtoken = await verifyToken(token.value)
    if (!isVerifiedTtoken) {
      token.value = null
    }
  }  

  if (to.path.includes('/admin')) {
    if (process.server) {
      if (!token.value) {
        return navigateTo('/auth?login')
      }
    }
  } 
  
  if (to.path.includes('/auth')) {
    if (process.server) {
      if (token.value) {
        return navigateTo('/admin/dashboard')
      }
    }
  }
})