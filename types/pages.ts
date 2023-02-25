interface Page {
  name: String
  slug: String
  isInMenu: Boolean
  parent: String[]
  menuOrder: number
  title: String
  description: String
  keywords: String
  contentComponents: String[]
  id: String
  author: String
}

interface CreatePageResult {
  createPage: Page
}

interface DeletePageResult {
  deletePage: Page
}

interface PagesResult {
  pages: [Page]
}

interface SinglePageResult {
  singlePage: Page
}

export {
  Page,
  CreatePageResult,
  DeletePageResult,
  PagesResult,
  SinglePageResult
}