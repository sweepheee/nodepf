import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: {
        type: String,
        default: "images/user-default.svg"
    },
    facebookId: Number,
    githubId: Number,
    imageChange: {
        type: Number,
        default: 0
    },
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const model = mongoose.model("User", UserSchema);
export default model;