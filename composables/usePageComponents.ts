import { ThemeFieldModel } from '~~/types/theme'
import { useThemeStore } from '~~/store/theme'
import { createPageComponentFieldModel } from '~~/models/forms'
import { storeToRefs } from 'pinia'

export const usePageComponents = () => {
  const { availablePageComponents } = useRuntimeConfig()
  const { setPageComponentFields, setPageComponents, setEditContentId } = useThemeStore()
  const { pageComponentFieldState, pageComponentsState, editContentId } = storeToRefs(useThemeStore())

  const addComponentToPage = (componentKey : string) => {
    const addComponent = [...sanitizedPageComponents()].find(component => component.componentKey === componentKey)
    if (addComponent) {
      const newId = `${addComponent.componentKey}_${createSafeId()}`
      addComponent.id = newId
      const componentArray = pageComponentsState.value
      componentArray.push(addComponent)
      setPageComponents(componentArray)
    }
  }

  const createPageComponentFields = (fieldModel : ThemeFieldModel, componentId : string) => {
    const createdPageComponentFields = createPageComponentFieldModel(fieldModel)
    setPageComponentFields(createdPageComponentFields, componentId)
    const pageComponent = pageComponentsState.value.find(selectedComponent => selectedComponent.id === componentId)
    const content = createdPageComponentFields.reduce((acc, field) => {
      if (field) {
        return { ...acc, [field.key]: field.default }
      }
      return { ...acc }
    }, {})
    if (pageComponent) pageComponent.meta.content = content
  }

  const sanitizedPageComponents = () : { componentKey : string, id : string, meta : any }[] => {
    return availablePageComponents.map((component : { name : string }) => {
      const sanitizedName = component.name.charAt(0).toUpperCase() + component.name.slice(1).replace('.vue', '')
      return {
        componentKey: sanitizedName,
        meta: {
          name: component.name,
          content: []
        },
      }
    })
  }

  const deleteComponentFromPage = (componentId : string) => {
    const componentArray = pageComponentsState
    componentArray.value = componentArray.value?.filter(c => c.id !== componentId)
    setPageComponents(componentArray.value)
  }

  const addContentToComponent = (componentId : string, content : Record<string, any>) => {
    const componentArray = pageComponentsState
    const componentToUpdate = componentArray.value?.find(c => c.id === componentId)
    if (componentToUpdate) {
      componentToUpdate.meta.content = content
    }
  }

  return {
    addComponentToPage,
    addContentToComponent,
    availablePageComponents: sanitizedPageComponents(),
    createPageComponentFields,
    deleteComponentFromPage,
    setPageComponents,
    setEditContentId,
    content: pageComponentsState,
    editContentId,
    fields: pageComponentFieldState,
    pageComponents: pageComponentsState
  }
}