interface User {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  passwordCheck?: string,
  id: string,
  role: number,
}

export {
  User
}