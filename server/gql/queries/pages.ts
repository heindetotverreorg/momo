import { gql } from 'graphql-tag'

export const createPageMutation = gql`
  mutation createPage ($page: PageInput!) {
    createPage (page: $page) {
      name
      slug
      isInMenu
      contentComponents
      parent
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
      contentComponents
      parent
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
  query fetchSinglePage ($slug: String!) {
    singlePage (slug: $slug) {
      name
      slug
      isInMenu
      contentComponents
      parent
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