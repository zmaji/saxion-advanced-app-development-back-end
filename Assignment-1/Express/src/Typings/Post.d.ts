import type { User } from './User';

export interface Post {
  postID: string,
  user: User,
  title: string,
  content: string,
  category: string,
  likes: number,
  dislikes: number
}