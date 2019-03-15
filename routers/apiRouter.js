import express from "express";
import routes from "../routes";
import { postRegisterview } from "../controllers/boardController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterview);


export default apiRouter;