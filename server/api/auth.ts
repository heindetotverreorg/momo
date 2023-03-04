import mongoose from 'mongoose'
import { UserSchema } from '~~/server/mongo/schemas'
import * as jose from 'jose'
import { User } from '~~/types/users'

const connectionString = process.env.MONGO_URL as string

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
  setCookie(event, 'momo:token', token, { httpOnly: true, secure: true, sameSite: true })

  return {
    authenticated: 'test: ' + token
  }
})

const connect = async (connectionString : string) => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(connectionString)
  } catch {
    throw new Error(`No connection to database`)
  }
}

const createToken = async (user : User) => {
  const alg = 'HS256'
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET)
  
  return await new jose.SignJWT({ user: user?.id, role: user?.role })
    .setProtectedHeader({ alg })
    .setExpirationTime('1hr')
    .sign(secret)
}