import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created: { type: Date, default: Date.now },
    categories: [{ type: String }]
})

const Post = mongoose.model('Post', PostSchema)
export default Post;