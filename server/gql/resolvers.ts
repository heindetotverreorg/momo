import { Pages, Users } from '~~/server/mongo/mongoConnect'
import { ERRORS } from '~~/constants/errors';
import { verifyToken } from '~~/server/utils/verifyToken'
import * as jose from 'jose'

const decodeToken = async (token : string) => {
  const isVerifiedTtoken = await verifyToken(token)
  if (!isVerifiedTtoken) {
    throw new Error(ERRORS.NOT_AUTHENTICATED_FOR_ADMIN)
  }
  const { user } = jose.decodeJwt(token)
  return user
}

export const resolvers = {
  Query: {
    pages: async (parent : any, { admin } : any, context : any) => {
      try {
        if (admin) {
          await decodeToken(context.token)
        }
        const pagesArray = await Pages.find({})
        if (!pagesArray) {
          throw new Error(ERRORS.NO_PAGES_IN_DATABASE)
        }
        return pagesArray
      } catch (error) {
        throw error
      }
    },
    singlePage: async (parent : any, { path } : any) => {
      try {
        const existingPage = await Pages.findOne({ path: path })
        if (existingPage) {
          return existingPage
        }
        throw new Error(ERRORS.PAGE_NOT_FOUND)
      } catch (error) {
        throw error
      }
    },
    singleUser: async (parent : any, variables : any, context : any) => {
      try {
        await decodeToken(context.token)
        const id = await decodeToken(context.token)
        const user = await Users.findOne({ id: id })
        if (!user) {
          throw new Error(ERRORS.USER_NOT_FOUND)
        }
        return user
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    createPage: async (parent : any, { page } : any, context : any) => {
      try {
        await decodeToken(context.token)
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
    createUser: async (parent : any, { user } : any, context : any) => {
      try {
        await decodeToken(context.token)
        const newUser = new Users({
          ...user
        })
        const existingUser = await Users.findOne({ email: user.email })
        if (existingUser) {
          throw new Error(ERRORS.USER_ALREADY_EXISTS)
        }
        await newUser.save()
        return newUser
      } catch (error) {
        throw error
      }
    },
    deletePage: async (parent : any, { id } : any, context : any) => {
      try {
        await decodeToken(context.token)
        const deletedPage = await Pages.findOneAndDelete({ id: id })
        if (!deletedPage) {
          throw new Error(ERRORS.PAGE_NOT_FOUND)
        }
        return deletedPage
      } catch (error) {
        throw error
      }
    },
    deleteUser: async (parent : any, { id } : any, context : any) => {
      try {
        await decodeToken(context.token)
        const deletedUser = await Pages.findOneAndDelete({ id: id })
        if (!deletedUser) {
          throw new Error(ERRORS.USER_NOT_FOUND)
        }
        return deletedUser
      } catch (error) {
        throw error
      }
    }
  }
};