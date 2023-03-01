import { useCookie } from '#app'
import * as jose from 'jose'

export default defineNuxtRouteMiddleware(async () => {
  if (!process.server) {
    return
  }

  const token = useCookie('token')

  if (!token.value) {
    return navigateTo('/auth?login')
  }

  try {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET)
    await jose.jwtVerify(token.value, secret)
  } catch (error : any) {
    if (error.reason === 'check_failed') {
      token.value = null
      return navigateTo('/auth?login')
    }
  }
})