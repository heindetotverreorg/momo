import { GraphQLScalarType, Kind } from 'graphql'

const parseLiteral = (ast : any) => {
  switch (ast.kind) {
    case Kind.BOOLEAN:
    case Kind.STRING:  
      return ast.value
    case Kind.INT:
    case Kind.FLOAT:
      return Number(ast.value)
    case Kind.LIST:
      return ast.values.map(parseLiteral)
    case Kind.OBJECT:
      return ast.fields.reduce((accumulator : any, field : any) => {
        accumulator[field.name.value] = parseLiteral(field.value)
        return accumulator
      }, {})
    case Kind.NULL:
        return null
    default:
      throw new Error(`Unexpected object value in PageComponentContent: ${ast.kind}`)
  }
}

new GraphQLScalarType({
  name: 'PageComponentContent',
  description: 'PageComponent content, can be many things',
  parseValue: (value) => value,
  parseLiteral,
  serialize: (value) => value,
})

export const typeDefs =  `#graphql
  scalar PageComponentContent

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
    pageComponents: [PageComponents]
    id: String
    author: String
  }

  type PageComponents {
    componentKey: String,
    id: String,
    meta: PageComponentMeta
  }

  type PageComponentMeta {
    name: String,
    content: PageComponentContent
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
    pageComponents: [PageComponentsInput]
    id: String
    author: String
  }

  input PageComponentsInput {
    componentKey: String,
    id: String,
    meta: PageComponentMetaInput
  }

  input PageComponentMetaInput {
    name: String,
    content: PageComponentContent
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