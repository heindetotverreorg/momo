interface Page {
  name: string
  slug: string
  isInMenu: Boolean
  parent: string[]
  menuOrder: number
  menuParent: string
  title: string
  description: string
  keywords: string
  contentComponents: string[]
  id: string
  author: string
}

export {
  Page
}