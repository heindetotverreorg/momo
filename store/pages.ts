import { defineStore } from 'pinia'
import { Page } from '~~/types/pages'

export const usePagesStore = defineStore('pagesStore', () => {
  const pages = ref<Page[]>([])

  const addPage = (fetchedPage : Page) => {
    const duplicateIndex = pages.value.findIndex(page => page.id === fetchedPage.id)
    if (duplicateIndex >= 0) {
      pages.value[duplicateIndex] = fetchedPage
    } else {
      pages.value.push(fetchedPage)
    }
  }

  const replacePages = (pagesArray : Page[]) => {
    pages.value = pagesArray
  }

  const removePage = (pageid : string) => {
    pages.value = pages.value.filter(page => page.id !== pageid)
  }

  return {
    addPage,
    pages,
    removePage,
    replacePages
  }
})