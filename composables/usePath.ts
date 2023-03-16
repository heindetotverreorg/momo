import { PATHS } from '~~/constants/paths'

export const usePath = () => {
  const { path, fullPath, query } = useRoute()

  const queryKey = Object.keys(query)?.[0] as string

  const updateQuery = (query : string) => {
    window.history.pushState({},'',`${path}?${query}`)
  }

  return {
    fullPath,
    queryKey,
    updateQuery
  }
}