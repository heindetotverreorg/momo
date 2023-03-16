import { Page } from '~~/types/pages'

export const pathParentMatch = (pathArr : String[], page : Page) => {
  // check if path compares to the pages parents array
  const isRootPath = pathArr.length === 1
  let pathMatch : Boolean = true
  pathArr.forEach((path, index) => {
    // page has invalid parents compared to path so we can stop comparing
    if (!pathMatch) return
    // page is root and has no parent so is valid
    if (isRootPath) {
      return pathMatch = !page.parent.length
    } else {
      // page is not root so page needs parent
      if (!page.parent[index]) return
      // page is not root so path levels should match page parents
      if (path !== page.parent[index]) return pathMatch = false
    }
    // all condition ok
    pathMatch = true
  }) 
  return pathMatch
}