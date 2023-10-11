import type { Comment } from '../Typings/Comment';

import mongoose, { Schema } from 'mongoose';

const commentSchema: Schema<Comment> = new Schema({
  commentID: {
    type: String,
    unique: true,
    immutable: true,
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
