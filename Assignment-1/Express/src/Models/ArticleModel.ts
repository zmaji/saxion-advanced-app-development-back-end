import type { Article } from '../Typings/Article';

import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const articleSchema: Schema<Article> = new Schema({
  articleID: {
    type: String,
    default: uuidv4(),
    unique: true,
    immutable: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  collection: 'articles',
  versionKey: false,
});

const ArticleModel = mongoose.model<Article>('Article', articleSchema);

export default ArticleModel;
