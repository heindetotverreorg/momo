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

  const fetchPages = async () => {
    const variables = {
      admin: true, fetchPolicy: "no-cache"
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
    const trimmedPath = fullPath.endsWith('/')
    ? fullPath.slice(0, -1)
    : fullPath
    const variables = {
      path: trimmedPath,
      fetchPolicy: "no-cache" 
    }
    const { data, error } = await useAsyncQuery<{singlePage : Page}>(fetchSinglePageQuery, variables)
    if (error.value) {
      await handleError(error.value)
    }
    if (!isValidPath(trimmedPath, data.value?.singlePage.path as string)) {
      await handleError({ message: ERRORS.INVALID_SINGLE_PAGE_PARENT_TREE })
    }
    return data.value?.singlePage
  }

  const isUniqueSlug = (input : string, parent : string) => {
    if (!onlyOneHomePage(input) || !input) {
      return true
    }
    if (parent) {
      const referencePage = pages.value.filter(page => page.slug === parent)
      if (referencePage.some(page => page.slug.replace('/', '') === input.replace('/', ''))) {
        return false
      }
    } else {
      const referencePage = pages.value.filter(page => !page.parent.length)
      if (referencePage.some(page => page.slug.replace('/', '') === input.replace('/', ''))) {
        return false
      }
    }
    return true
  }

  const onlyOneHomePage = (input : string) => {
    if (input !== '/') {
      return true
    }
    const referencePage = pages.value.find(page => page.slug === '/')
    if (referencePage) {
      return false
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