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
  pageComponents: pageComponentContent[]
  id: string
  author: string
}

interface pageComponentContent {
  componentKey: string,
  id: string,
  meta: {
    name: string,
    content: Record<string, any>
  }
}

export {
  Page,
  pageComponentContent
}