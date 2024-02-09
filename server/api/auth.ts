import mongoose from 'mongoose'
import { UserSchema } from '~~/server/mongo/schemas'
import * as jose from 'jose'
import { User } from '~~/types/users'

const connectionString = process.env.MONGO_URL as string
const tokenSecret = process.env.TOKEN_SECRET

export default defineEventHandler(async (event) => {
  await connect(connectionString)
  const { email, password } = await readBody(event)
  const Users = mongoose.model('Users', UserSchema)
  const user = await Users.findOne({ email: email }) as User

  if (!email || !password) {
    throw new Error(`No email or password sent`)
  }

  if (user?.password !== password) {
    throw new Error(`Password email combination not correct`)
  }

  const token = await createToken(user)
  // todo: set secure when certs is set on prod -> https
  setCookie(event, 'momo:token', token, { httpOnly: true, sameSite: true })

  return {
    authenticated: true
  }
})

const connect = async (connectionString : string) => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(connectionString)
  } catch(error) {
    throw new Error(`No connection to database - ${error}`)
  }
}

const createToken = async (user : User) => {
  const alg = 'HS256'
  const secret = new TextEncoder().encode(tokenSecret)
  
  return await new jose.SignJWT({ user: user?.id, role: user?.role })
    .setProtectedHeader({ alg })
    .setExpirationTime('1hr')
    .sign(secret)
}