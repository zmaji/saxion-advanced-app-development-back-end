import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    name: String,
    description: String,
    content: String,
}, {
    collection: 'articles'
})

export default mongoose.model('Article', ArticleSchema);