const ERRORS = {
  NOT_AUTHENTICATED_FOR_ADMIN: '401: Not authenticated',
  INVALID_SINGLE_PAGE_PARENT_TREE: '500: Invalid page parent tree',
  NO_PAGES_IN_DATABASE: '404: No pages present',
  PAGE_NOT_FOUND: '404: Page not found',
  USER_NOT_FOUND: '404: User not found',
  PASSWORD_NO_MATCH: '500: Password email combination not correct',
  USER_ALREADY_EXISTS: '500: User already exists'
}

Object.freeze(ERRORS)

export {
  ERRORS
}