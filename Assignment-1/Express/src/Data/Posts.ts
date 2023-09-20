import type { Post } from "../Typings/Post";
import users from "./Users";

const posts: Post[] = [
  {
    id: '1',
    user: users[0],
    title: 'Title',
    content: 'Content',
    category: 'Category',
    likes: 5,
    dislikes: 1
  },
  {
    id: '2',
    user: users[0],
    title: 'Title2',
    content: 'Content2',
    category: 'Category2',
    likes: 5,
    dislikes: 1
  },
];

export default posts;

