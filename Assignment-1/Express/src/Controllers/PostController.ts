import { Post } from '../Typings/Post';

import posts from '../Data/Posts';

const getPosts = (): Post[] => {
  return posts;
};

const getPostByID = (postID: string): Post | undefined => {
  return posts.find((post) => post.id === postID);
};

const PostController = {
  getPostByID,
  getPosts
};

export default PostController;