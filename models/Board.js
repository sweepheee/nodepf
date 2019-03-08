import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    no: {
        type: Number,
        default: 0,
        index: true
    },
    title : {
        type: String,
        require: "제목은 필수입력 사항입니다"
    },
    content: String,
    createdAt : {
        type: Date,
        default: Date.now
    }
})

const model = mongoose.model("board", boardSchema);
export default model;