import type { Comment } from './Comment';

export interface Post {
  postID: string,
  user: string,
  date: string,
  title: string,
  content: string,
  categories: string[],
  likes: number,
  dislikes: number
}

export interface SimplePost {
  postID: string,
  title: string,
  content: string,
  categories: string[],
  likes: number,
  dislikes: number,
  commentCount: number
}

export interface PostDetail {
  postID: string,
  user: string,
  date: string,
  title: string,
  content: string,
  categories: string[],
  likes: number,
  dislikes: number,
  comments: Comment[]
}
