import express from "express";
import routes from "../routes"
import { getWrite, board, postWrite, getBoardView, boardPageNumber } from "../controllers/boardController";
import { uploadWriteSingle, onlyPrivate } from "../middlewares";

const boardRouter = express.Router();


boardRouter.get("/", board);
boardRouter.get(routes.boardPaging(), boardPageNumber)
// boardRouter.get(routes.board(), pagingBoard);
boardRouter.get(routes.write, onlyPrivate, getWrite);
boardRouter.post(routes.write, onlyPrivate, uploadWriteSingle, postWrite);


boardRouter.get(routes.boardView(), getBoardView);

export default boardRouter;