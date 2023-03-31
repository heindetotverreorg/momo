export const typeDefs =  `#graphql
  type Page {
    name: String
    slug: String
    isInMenu: Boolean
    parent: [String]
    path: String
    menuOrder: Int
    title: String
    description: String
    keywords: String
    pageComponents: [String]
    id: String
    author: String
  }

  type User {
    id: String
    firstName: String
    lastName: String
    email: String
    password: String
    group: Int
    role: String
  }

  input PageInput {
    name: String
    slug: String
    isInMenu: Boolean
    parent: [String]
    path: String
    menuOrder: Int
    title: String
    description: String
    keywords: String
    pageComponents: [String]
    id: String
    author: String
  }

  input UserInput {
    id: String
    firstName: String
    lastName: String
    email: String
    password: String
    group: Int
    role: String
  }

  type Query {
    pages(admin: Boolean): [Page]
    singlePage(path: String): Page
    singleUser: User
  }

  type Mutation {
    createPage(page: PageInput): Page
    createUser(user: UserInput): User
    deletePage(id: String): Page
    deleteUser(id: String): User
  }

`