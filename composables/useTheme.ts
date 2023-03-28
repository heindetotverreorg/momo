export const useTheme = () => {
  const { themeComponents } = useRuntimeConfig()

  const sanitizedThemeComponents = () => {
    return themeComponents.map((component : { name : string }) => {
      return component.name.charAt(0).toUpperCase() + component.name.slice(1).replace('.vue', '')
    })
  }

  return {
    themeComponents: sanitizedThemeComponents()
  }
}