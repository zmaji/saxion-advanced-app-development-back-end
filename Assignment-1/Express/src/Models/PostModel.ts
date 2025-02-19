import type { Post } from '../Typings/Post';

import mongoose, { Schema } from 'mongoose';

const postSchema: Schema<Post> = new Schema({
  postID: {
    type: String,
    unique: true,
    immutable: true,
  },
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  location: {
    type: String,
  },

}, {
  collection: 'posts',
  versionKey: false,
});

const PostModel = mongoose.model<Post>('Post', postSchema);

export default PostModel;
