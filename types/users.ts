interface User {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  passwordCheck?: string,
  id: string,
  role: number,
}

interface CreateUserResult {
  createPage: User
}

interface SinglePageResult {
  singleUser: User
}

export {
  CreateUserResult,
  SinglePageResult,
  User
}