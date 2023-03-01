import mongoose from 'mongoose'
import { PageSchema, UserSchema } from '~~/server/mongo/schemas'

try {
  const connectionString = process.env.MONGO_URL as string
  connect(connectionString)
} catch (error) {
  console.log(error)
}

const Pages = mongoose.model('Pages', PageSchema)
const Users = mongoose.model('USers', UserSchema)

export {
  Pages,
  Users
}

async function connect(connectionString : string) {
  mongoose.set('strictQuery', false)
  await mongoose.connect(connectionString)
}