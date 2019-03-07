import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: "이메일은 필수로 입력해야 합니다."
    },
    password : {
        type: String,
        required: "비밀번호를 입력해주세요."
    },
    nickname : {
        type: String,
        required: "닉네임은 필수로 입력해야합니다."
    },
    avatar: {
        type: String,
        default : "./images/default.png"
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

const model = mongoose.model("User", UserSchema);
export default model;