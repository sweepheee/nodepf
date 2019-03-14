import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    no: {
        type: Number,
        default: 0
    },
    title : {
        type: String,
        require: "제목은 필수입력 사항입니다"
    },
    content: String,
    createdAt : {
        type: Date,
        default: Date.now
    },
    imageFile: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const model = mongoose.model("board", boardSchema);
export default model;