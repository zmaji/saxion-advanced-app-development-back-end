export interface Comment {
  id?: number;
  userID: number;
  postID: number;
  content: string | null;
}