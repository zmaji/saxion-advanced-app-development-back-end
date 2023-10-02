export interface User {
  userID: string,
  firstName: string,
  lastName: string,
  nickName: string,
  email: string,
  password: string,
  secret: string,
  avatar?: string,
  roles: string[]
}