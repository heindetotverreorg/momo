import * as jose from 'jose'

export const verifyToken = async (token : string) => {
  if (!token) return false
  try {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET)
    await jose.jwtVerify(token, secret)
    return true
  } catch (error : any) {
    if (error.reason === 'check_failed') {
      return false
    }
  }
}