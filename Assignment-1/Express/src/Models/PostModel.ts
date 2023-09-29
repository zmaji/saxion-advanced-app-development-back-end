import type { Post } from "../Typings/Post";

import mongoose, { Schema } from 'mongoose';

const postSchema: Schema<Post> = new Schema({
    postID: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: String,
        ref: 'User',
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
    category: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    }
}, {
    collection: 'posts',
    versionKey: false
});

const PostModel = mongoose.model<Post>('Post', postSchema);

export default PostModel;