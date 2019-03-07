import express from "express";
import routes from "../routes"
import { getWrite } from "../controllers/boardController";

const boardRouter = express.Router();


boardRouter.get(routes.write, getWrite);