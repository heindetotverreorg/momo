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

export {
  Page
}