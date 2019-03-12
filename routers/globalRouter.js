import express from "express";
import routes from "../routes"
import { home, getJoin, postJoin, getLogin, postLogin  } from "../controllers/globalController";
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home)
// JOIN
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
// LOGIN
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

export default globalRouter;