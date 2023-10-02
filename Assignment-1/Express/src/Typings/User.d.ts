export interface User {
  userID: string,
  userName: string,
  email: string,
  password: string,
  secret: string,
  avatar?: string,
  roles: string[]
}