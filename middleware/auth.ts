import { useCookie } from '#app'
import * as jose from 'jose'

export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie('momo:token')
  await verifyToken(token)
})

const verifyToken = async (token : Ref) => {
  try {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET)
    await jose.jwtVerify(token.value, secret)
  } catch (error : any) {
    if (error.reason === 'check_failed') {
      token.value = null
    }
  }
}