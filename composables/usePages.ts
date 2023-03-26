import { ERRORS } from '~~/constants/errors'
import { createPageMutation, deletePageMutation, fetchPagesQuery, fetchSinglePageQuery } from '~~/server/gql/queries/pages'
import { Page } from '~~/types/pages'
import { handleError } from '~~/utils/handleError'
import { validators } from 'mesh-ui-components'
import { usePagesStore } from '~~/store/pages'
import { storeToRefs } from 'pinia'
import { PATHS } from '~~/constants/paths'

export const usePages = () => {
  const { addPage, removePage, replacePages } = usePagesStore()
  const { pages } = storeToRefs(usePagesStore())

  const createPage = async (page: Page) => {
    const variables = {
      page
    }
    try {
      const { mutate: createPage } = useMutation(createPageMutation, { variables })
      const result = await createPage()
      if (result?.data) {
        const { data } = result
        addPage(data.createPage)
      }
    } catch (error) {
      return error
    }
  }

  const createPageParentMeta = (menuParent : string, slug : string) => {
    let array : string[] = []

    const recursivelyCheckParent = (parent : any) => {
      if (parent) {
        array.push(parent.replace('/', ''))
      }
      const parentPage = pages.value.find(page => page.name === parent)
      if (parentPage) {
        recursivelyCheckParent(parentPage.parent.pop())
        return
      }
      return
    }
    recursivelyCheckParent(menuParent)

    array.reverse()

    const path = `${array.length ? '/' : ''}${array.join('/')}/${slug}`

    return {
      pathArray: array,
      path: slug === PATHS.HOME ? '/' : path
    }
  }

  const deletePage = async (id: String) => {
    const variables = {
      id
    }
    try {
      const { mutate: deletePage } = await useMutation(deletePageMutation, { variables })
      const result = await deletePage()
      if (result?.data) {
        const { data } = result
        removePage(data.deletePage.id)
      }
    } catch (error) {
      return error
    }
  }

  const fetchPages = async (config : { cached: boolean } = { cached: true }) => {
    if (config.cached) {
      if (pages.value.length) {
        return pages
      }
    }
    const variables = {
      admin: true,
      fetchPolicy: "no-cache"
    }
    const { data, error } = await useAsyncQuery<{ pages: Page[] }>(fetchPagesQuery, variables)
    if (error.value) {
      await handleError(error.value)
    }
    if(data.value?.pages) {
      replacePages(data.value.pages)
    }
    return pages
  }

  const fetchSinglePage = async (fullPath : string) => {
    const variables = {
      path: fullPath,
      fetchPolicy: "no-cache" 
    }
    const { data, error } = await useAsyncQuery<{singlePage : Page}>(fetchSinglePageQuery, variables)
    if (error.value) {
      await handleError(error.value)
    }
    if (!isValidPath(fullPath, data.value?.singlePage.path as string)) {
      await handleError({ message: ERRORS.INVALID_SINGLE_PAGE_PARENT_TREE })
    }
    return data.value?.singlePage
  }

  const isUniqueSlug = (slug : string, parent : string) => {
    if (!onlyOneHomePage(slug) || !slug) {
      return true
    }
    if (parent) {
      const referencePages = pages.value.filter(page => page.parent[page.parent.length - 1] === parent)
      if (referencePages.some(page => page.slug === slug)) {
        return false
      }
    } else {
      const referencePages = pages.value.filter(page => !page.parent.length)
      if (referencePages.some(page => page.slug === slug)) {
        return false
      }
    }
    return true
  }

  const onlyOneHomePage = (slug : string) => {
    if (slug === 'home') {
      const referencePage = pages.value.find(page => page.slug === slug)
      if (referencePage) {
        return false
      }
    }
    return true
  }

  return {
    createPage,
    createPageParentMeta,
    deletePage,
    fetchPages,
    fetchSinglePage,
    isUniqueSlug,
    onlyOneHomePage,
    pages: pages
  }
}

const isValidPath = (pathFromUrl : string, pathFromPage : string) : Boolean => {
  const { issamevalue } = validators
  return issamevalue.validate(pathFromUrl, pathFromPage)
}