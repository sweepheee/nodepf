import express from "express";
import routes from "../routes"
import { getWrite, board, postWrite } from "../controllers/boardController";

const boardRouter = express.Router();


boardRouter.get("/", board);
boardRouter.get(routes.write, getWrite);
boardRouter.post(routes.write, postWrite);

export default boardRouter;