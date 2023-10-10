import type { User } from 'User';
import type { Post } from 'Post';

export interface Comment {
  commentID: string,
  user: User,
  post: Post,
  content: string,
}
