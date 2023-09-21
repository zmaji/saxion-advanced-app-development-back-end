import mongoose, { Schema, Document } from 'mongoose';

export interface Article extends Document {
    articleID: string;
    name: string;
    description: string;
    content: string;
}

const articleSchema: Schema<Article> = new Schema({
    articleID: {
        type: String,
        required: true,
        unique: true,
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
    versionKey: false
});

const ArticleModel = mongoose.model<Article>('Article', articleSchema);

export default ArticleModel;