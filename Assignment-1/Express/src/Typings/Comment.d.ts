import type { User } from '.User';
import type { Post } from '.Post';

export interface Comment {
  id: string,
  user: User,
  post: Post,
  content: string,
}