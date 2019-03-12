import express from "express";
import routes from "../routes";
import { onlyPublic } from "../middlewares";

const userRouter = express.Router();

// userRouter.get(routes.editProfile, onlyPublic, editProfile);

export default userRouter;