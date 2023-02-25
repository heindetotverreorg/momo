export const typeDefs =  `#graphql
  type Page {
    name: String
    slug: String
    isInMenu: Boolean
    parent: [String]
    menuOrder: Int
    title: String
    description: String
    keywords: String
    contentComponents: [String]
    id: String
    author: String
  }

  type Query {
    pages: [Page]
    singlePage(slug: String): Page
  }

  input PageInput {
    name: String
    slug: String
    isInMenu: Boolean
    parent: [String]
    menuOrder: Int
    title: String
    description: String
    keywords: String
    contentComponents: [String]
    id: String
    author: String
  }

  type Mutation {
    createPage(page: PageInput): Page
    deletePage(id: String): Page
  }

`