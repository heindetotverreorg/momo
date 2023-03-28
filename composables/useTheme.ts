export const useTheme = () => {
  const { themeComponents } = useRuntimeConfig()

  const sanitizedThemeComponents = () : { name : string, id : string, meta : any }[] => {
    return themeComponents.map((component : { name : string }) => {
      const sanitizedName = component.name.charAt(0).toUpperCase() + component.name.slice(1).replace('.vue', '')
      return {
        name: sanitizedName,
        id: '',
        meta: component
      }
    })
  }

  return {
    themeComponents: sanitizedThemeComponents()
  }
}