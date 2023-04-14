import { defineStore } from 'pinia'
import { FormField } from 'mesh-ui-components'

export const useThemeStore = defineStore('themeStore', () => {
  const pageComponentFieldState = ref<Record<string, (FormField | undefined)[]>>({})
  const pageComponentsState = ref<{ componentKey : string, id : string, meta : any }[]>([])
  const editContentIdState = ref('')

  const setPageComponentFields = (fields : (FormField | undefined)[], id : string) => {
    pageComponentFieldState.value[id] = fields
  }
 
  const setPageComponents = (components : { componentKey : string, id : string, meta : any }[]) => {
    pageComponentsState.value  = components
  }

  const setEditContentId = (id : string) => {
    editContentIdState.value = id
  }

  return {
    setEditContentId,
    setPageComponentFields,
    setPageComponents,
    editContentId: editContentIdState,
    pageComponentFieldState,
    pageComponentsState
  }
})