import express from "express";
import routes from "../routes"
import { home, getJoin, postJoin, getLogin, postLogin  } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home)
// JOIN
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);
// LOGIN
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

export default globalRouter;