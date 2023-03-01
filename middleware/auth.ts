import { useCookie } from '#app'
import * as jose from 'jose'

export default defineNuxtRouteMiddleware(() => {
  if (!process.server) {
    return
  }

  const token = useCookie('token')

  if (!token.value) {
    return navigateTo('/auth?login')
  }

  try {
    checkToken(token.value)
  } catch (error : any) {
    if (error.message === 'jwt expired') {
      token.value = null
      return navigateTo('/auth?login')
    }
  }
})

const checkToken = async (token : string) => {
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET)
  await jose.jwtVerify(token, secret)
}