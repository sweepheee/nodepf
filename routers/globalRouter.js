import express from "express";
import routes from "../routes"
import passport from "passport";
import { home, getJoin, postJoin, getLogin, postLogin, logout, githubLogin, githubLoginCallback, postGithubLogin  } from "../controllers/globalController";
import { onlyPublic, onlyPrivate } from "../middlewares";
import { getMe } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home)
// JOIN
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
// LOGIN
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.githubCallback, 
    passport.authenticate("github", { failureRedirect: "/login"}),
    postGithubLogin
);

globalRouter.get(routes.me, getMe);

globalRouter.get(routes.logout, onlyPrivate,logout);

export default globalRouter;