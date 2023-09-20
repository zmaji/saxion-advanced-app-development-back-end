import type { Comment } from "../Typings/Comment";
import users from "./Users";
import posts from "./Posts";

const comments: Comment[] = [
  {
    id: '1',
    user: users[0],
    post: posts[0],
    content: 'Content',
  },
];

export default comments;
