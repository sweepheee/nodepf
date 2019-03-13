import express from "express";
import routes from "../routes";
import { onlyPublic } from "../middlewares";
import { editProfile, userDetail } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPublic, editProfile);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;