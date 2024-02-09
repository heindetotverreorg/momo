import mongoose from 'mongoose'
import { PageSchema, UserSchema } from '~~/server/mongo/schemas'

const connectionString = process.env.MONGO_URL as string
connect(connectionString)

const Pages = mongoose.model('Pages', PageSchema)
const Users = mongoose.model('USers', UserSchema)

export {
  Pages,
  Users
}

async function connect(connectionString : string) {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(connectionString)
  } catch (error) {
    throw new Error(`No connection to database - ${error}`)
  }
}
