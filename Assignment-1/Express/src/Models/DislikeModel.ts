import type { Dislike } from '../Typings/Dislike';

import mongoose, { Schema } from 'mongoose';

const dislikeSchema: Schema<Dislike> = new Schema({
  dislikeID: {
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
  collection: 'dislikes',
  versionKey: false,
});

const ArticleModel = mongoose.model<Dislike>('Dislike', dislikeSchema);

export default ArticleModel;
