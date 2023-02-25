import { Pages } from '~~/server/mongo/mongoConnect'


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
    }
  }
};
