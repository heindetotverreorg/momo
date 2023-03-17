import { sanitizeFullPath } from '~~/utils/sanitizeFullPath'

export const usePath = () => {
  const { path, fullPath, query } = useRoute()

  const queryKey = Object.keys(query)?.[0] as string

  const updateQuery = (query : string) => {
    window.history.pushState({},'',`${path}?${query}`)
  }

  return {
    fullPath: sanitizeFullPath(fullPath),
    queryKey,
    updateQuery
  }
}