import type { Article } from '../Typings/Article';

import mongoose, { Schema } from 'mongoose';

const articleSchema: Schema<Article> = new Schema({
  articleID: {
    type: String,
    unique: true,
    immutable: true,
  },
  title: {
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
  category: {
    type: String,
    required: true,
  },
}, {
  collection: 'articles',
  versionKey: false,
});

const ArticleModel = mongoose.model<Article>('Article', articleSchema);

export default ArticleModel;
