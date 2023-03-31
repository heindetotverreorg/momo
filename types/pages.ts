interface Page {
  name: string
  slug: string
  isInMenu: Boolean
  parent: string[]
  path: string,
  menuOrder: number
  menuParent: string
  title: string
  description: string
  keywords: string
  pageComponents: string[]
  id: string
  author: string
}

export {
  Page
}