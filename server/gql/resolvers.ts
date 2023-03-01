import { Pages, Users } from '~~/server/mongo/mongoConnect'

export const resolvers = {
  Query: {
    pages: async () => {
      try {
        const pagesArray = await Pages.find({})
        if (!pagesArray) {
          throw new Error(`No pages present`)
        }
        return pagesArray
      } catch (error) {
        throw error
      }
    },
    singlePage: async (_:any, { slug }: any) => {
      try {
        const existingPage = await Pages.findOne({ slug: slug })
        if (existingPage) {
          return existingPage
        }
        throw new Error(`Page with ${slug} not found`)
      } catch (error) {
        throw error
      }
    },
    singleUser: async (_:any, { email, password }:any) => {
      try {
        const user = await Users.findOne({ email: email })
        if (!user) {
          throw new Error(`No user present for email: ${email}`)
        }
        if (user.password !== password) {
          throw new Error(`Password email combination not correct: ${user.password}. payload: ${email} ${password}`)
        }
        return user
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    createPage: async (_:any, { page }:any) => {
      try {
        const newPage = new Pages({
          ...page
        })
        const existingPage = await Pages.findOne({ slug: page.slug })
        if (existingPage) {
          await Pages.findOneAndUpdate({ slug: page.slug }, page)
          const updatedPage = await Pages.findOne({ slug: page.slug })
          return updatedPage
        }
        await newPage.save()
        return newPage
      } catch (error) {
        throw error
      }
    },
    createUser: async (_:any, { user }:any) => {
      try {
        const newUser = new Users({
          ...user
        })
        const existingUser = await Users.findOne({ email: user.email })
        if (existingUser) {
          throw new Error(`User with email: ${user.email} already exists not found`)
        }
        await newUser.save()
        return newUser
      } catch (error) {
        throw error
      }
    },
    deletePage: async (_:any, { id }:any) => {
      try {
        const deletedPage = await Pages.findOneAndDelete({ id: id })
        if (!deletedPage) {
          throw new Error(`Page with ${id} not found`)
        }
        return deletedPage
      } catch (error) {
        throw error
      }
    },
    deleteUser: async (_:any, { id }:any) => {
      try {
        const deletedUser = await Pages.findOneAndDelete({ id: id })
        if (!deletedUser) {
          throw new Error(`User with ${id} not found`)
        }
        return deletedUser
      } catch (error) {
        throw error
      }
    }
  }
};