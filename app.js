import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";
import boardRouter from "./routers/boardRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
import "./db";
import dotenv from "dotenv";
import "./models/User"
import "./models/Board"

import "./passport";


const app = express();
dotenv.config();
const PORT = process.env.PORT;

const CookieStore = MongoStore(session)

// view engine 설정.
app.set("view engine", "pug");

// Middlewares (니코는 커넥션이라고 부리기도 함.)
app.use(helmet());
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use("/images", express.static("images"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
        mongooseConnection: mongoose.connection
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Middlewares 직접 만든 변수
app.use(localsMiddleware);

// Routers
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.board, boardRouter);
app.use(routes.api, apiRouter);

app.listen(PORT, (req, res) => console.log("server on http://localhost:4000"));