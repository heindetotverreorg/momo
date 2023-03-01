import { PATHS } from '~~/constants/paths'

export const usePath = () => {
  const { params, path, fullPath, query } = useRoute()
  const lastPathPart = params.path ? [...params.path].pop() : ['']
  const pathArr = !lastPathPart ? params.path.slice(0, -1) : params.path || ['']
  const slug = [...pathArr].pop() || PATHS.PATH_BASE

  const queryKey = Object.keys(query)?.[0] as string

  const updateQuery = (query : string) => {
    window.history.pushState({},'',`${path}?${query}`)
  }

  return {
    fullPath,
    pathArr: pathArr as string[],
    queryKey,
    slug,
    updateQuery
  }
}