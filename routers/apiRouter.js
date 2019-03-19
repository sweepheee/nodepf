import express from "express";
import routes from "../routes";
import { postRegisterview, postAddComment } from "../controllers/boardController";
import { ajaxIdCheck } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterview);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.get("/:id/idCheck", ajaxIdCheck)


export default apiRouter;