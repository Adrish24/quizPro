import mongoose from "mongoose";

const post = new mongoose.Schema({
    name: {type: String, required: true},
    uid: {type: String, required: true},
    score:{type: Number, required: true},
    session: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
})

const postSchema = mongoose.model('post', post)

export default postSchema;