import type { User } from '../Typings/User';
import type { Post } from '../Typings/Post';

export interface Comment {
  id: string,
  user: User,
  post: Post,
  content: string,
}