import { PATHS } from '~~/constants/paths'

export const usePath = () => {
  const { params, fullPath } = useRoute()
  const { path } = params
  const lastPathPart = [...path].pop()
  const pathArr = !lastPathPart ? path.slice(0, -1) : path
  const slug = [...pathArr].pop() || PATHS.PATH_BASE

  return {
    fullPath,
    slug,
    pathArr
  }
}