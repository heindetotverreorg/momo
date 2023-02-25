import mongoose from 'mongoose'
import { PageSchema } from '~~/server/mongo/schemas'


try {
  const connectionString = process.env.MONGO_URL as string
  connect(connectionString)
} catch (error) {
  console.log(error)
}

const Pages = mongoose.model('Pages', PageSchema)

export {
  Pages
}

async function connect(connectionString : string) {
  mongoose.set('strictQuery', false)
  await mongoose.connect(connectionString)
}