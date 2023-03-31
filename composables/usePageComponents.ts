import { ThemeFieldModel } from '~~/types/theme'
import { useThemeStore } from '~~/store/theme'
import { createFieldModel } from '~~/models/forms'
import { storeToRefs } from 'pinia'

export const usePageComponents = () => {
  const { availablePageComponents } = useRuntimeConfig()
  const { setPageComponentContent, setPageComponents } = useThemeStore()
  const { pageComponentContentState, pageComponentsState } = storeToRefs(useThemeStore())

  const createPageComponentContent = (fieldModel : ThemeFieldModel) => {
    const createdContentFields = createFieldModel(fieldModel)
    setPageComponentContent(createdContentFields)
  }

  const sanitizedPageComponents = () : { name : string, id : string, meta : any }[] => {
    return availablePageComponents.map((component : { name : string }) => {
      const sanitizedName = component.name.charAt(0).toUpperCase() + component.name.slice(1).replace('.vue', '')
      return {
        name: sanitizedName,
        id: '',
        meta: component
      }
    })
  }

  return {
    createPageComponentContent,
    content: pageComponentContentState,
    pageComponents: pageComponentsState,
    setPageComponents,
    availablePageComponents: sanitizedPageComponents()
  }
}