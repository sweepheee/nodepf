import express from "express";
import routes from "../routes";
import { postRegisterview, postAddComment } from "../controllers/boardController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterview);
apiRouter.post(routes.addComment, postAddComment);


export default apiRouter;