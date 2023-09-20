import type { User } from './User';

export interface Post {
  id: string,
  user: User,
  title: string,
  content: string,
  category: string,
  likes: number,
  dislikes: number
}