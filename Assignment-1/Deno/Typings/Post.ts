export interface Post {
  id?: number;
  userID: number;
  title: string;
  content: string | null;
  category: string | null;
  likes: number;
  dislikes: number;
}