import { defineStore } from 'pinia'
import { ThemeFieldModel } from '~~/types/theme'

export const useThemeStore = defineStore('themeStore', () => {
  const pageComponentContentState = ref({})
  const pageComponentsState = ref<{ name : string, id : string, meta : any }[]>([])

  const setPageComponentContent = (fields : ThemeFieldModel) => {
    pageComponentContentState.value = fields
  }
 
  const setPageComponents = (components : Ref<{ name : string, id : string, meta : any }[]>) => {
    pageComponentsState.value  = components.value
  }

  return {
    setPageComponentContent,
    setPageComponents,
    pageComponentContentState,
    pageComponentsState
  }
})