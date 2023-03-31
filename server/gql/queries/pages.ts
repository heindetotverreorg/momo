import { gql } from 'graphql-tag'

export const createPageMutation = gql`
  mutation createPage ($page: PageInput!) {
    createPage (page: $page) {
      name
      slug
      isInMenu
      pageComponents
      parent
      path
      menuOrder
      title
      description
      keywords
      id
      author
    }
  }
`

export const deletePageMutation = gql`
  mutation deletePage ($id: String!) {
    deletePage (id: $id) {
      id
    }
  }
`

export const fetchPagesQuery = gql`
  query fetchPages ($admin: Boolean) {
    pages (admin: $admin) {
      name
      slug
      isInMenu
      pageComponents
      parent
      path
      menuOrder
      title
      description
      keywords
      id
      author
    }
  }
`

export const fetchSinglePageQuery = gql`
  query fetchSinglePage ($path: String!) {
    singlePage (path: $path) {
      name
      slug
      isInMenu
      pageComponents
      parent
      path
      menuOrder
      title
      description
      keywords
      id
      author
    }
    pages {
      slug
      title
      parent
      menuOrder
    }
  }
`