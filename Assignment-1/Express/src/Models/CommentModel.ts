import type { Comment } from '../Typings/Comment';

import mongoose, { Schema } from 'mongoose';

const commentSchema: Schema<Comment> = new Schema({
  commentID: {
    type: String,
    unique: true,
    immutable: true,
  },
  date: {
    type: String,
    immutable: true,
    required: true,
  },
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  post: {
    type: String,
    ref: 'Post',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  collection: 'comments',
  versionKey: false,
});

const CommentModel = mongoose.model<Comment>('Comment', commentSchema);

export default CommentModel;
