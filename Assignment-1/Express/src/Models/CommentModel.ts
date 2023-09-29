import type { Comment } from "../Typings/Comment";

import mongoose, { Schema } from 'mongoose';

const commentSchema: Schema<Comment> = new Schema({
    commentID: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    collection: 'comments',
    versionKey: false
});

const CommentModel = mongoose.model<Comment>('Comment', commentSchema);

export default CommentModel;