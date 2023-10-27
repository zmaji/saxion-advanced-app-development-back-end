import type { Like } from '../Typings/Like';

import mongoose, { Schema } from 'mongoose';

const likeSchema: Schema<Like> = new Schema({
  likeID: {
    type: String,
    unique: true,
    immutable: true,
  },
  post: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
}, {
  collection: 'likes',
  versionKey: false,
});

const ArticleModel = mongoose.model<Like>('Like', likeSchema);

export default ArticleModel;
