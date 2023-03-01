import { createPageMutation, deletePageMutation, fetchPagesQuery, fetchSinglePageQuery } from '~~/server/gql/queries/pages'
import { Page, CreatePageResult, DeletePageResult, PagesResult, SinglePageResult } from '~~/types/pages'

export const usePages = () => {
  const state = reactive({
    pages: [] as Page[]
  })

  const createPage = async (page: Page) => {
    const variables = {
      page
    }
    try {
      const { mutate: createPage } = useMutation<CreatePageResult>(createPageMutation, { variables })
      const result = await createPage()
      if (result?.data) {
        const { data } = result
        const duplicateIndex = state.pages.findIndex(page => {
          return page.id === data.createPage.id
        })
        if (duplicateIndex >= 0) {
          state.pages[duplicateIndex] = data.createPage
        } else {
          state.pages.push(data.createPage)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deletePage = async (id: String) => {
    const variables = {
      id
    }
    try {
      const { mutate: deletePage } = await useMutation<DeletePageResult>(deletePageMutation, { variables })
      const result = await deletePage()
      if (result?.data) {
        const { data } = result
        const newPagesArray = state.pages.filter(page => page.id !== data.deletePage.id)
        state.pages = newPagesArray
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPages = async () => {
    const { data } = await useAsyncQuery<PagesResult>(fetchPagesQuery)
    if(data.value?.pages) {
      state.pages = data.value.pages
    }
  }

  const fetchSinglePage = async (slug : String, pathArr : String[], fullPath : String) => {
    const variables = {
      slug, fetchPolicy: "no-cache" 
    }
    const { data } = await useAsyncQuery<SinglePageResult>(fetchSinglePageQuery, variables)
      if (!isValidPath(pathArr, data?.value?.singlePage)) {
        throw createError({ statusCode: 404, statusMessage: `Page Not Found: ${fullPath}`, fatal: true })
      }
      return data.value?.singlePage
  }

  return {
    createPage,
    deletePage,
    fetchPages,
    fetchSinglePage,
    pages: computed(() => state.pages as [Page])
  }
}

const isValidPath = (pathArr : String[], page : Page | undefined) : Boolean => {
  return page ? pathParentMatch(pathArr, page) : false
}

const pathParentMatch = (pathArr : String[], page : Page) => {
  // check if path compares to the pages parents array
  const isRootPath = pathArr.length === 1
  let pathMatch : Boolean = true
  pathArr.forEach((path, index) => {
    // page has invalid parents compared to path so we can stop comparing
    if (!pathMatch) return
    // page is root and has no parent so is valid
    if (isRootPath) {
      return pathMatch = !page.parent.length
    } else {
      // page is not root so page needs parent
      if (!page.parent[index]) return
      // page is not root so path levels should match page parents
      if (path !== page.parent[index]) return pathMatch = false
    }
    // all condition ok
    pathMatch = true
  }) 
  return pathMatch
}