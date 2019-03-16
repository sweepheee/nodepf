import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: "Text is required"
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    delete : {
        type: Number,
        default: 0
    }
});

const model = mongoose.model("Comment", CommentSchema);
export default model;