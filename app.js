import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
import "./db";
import dotenv from "dotenv";
import "./models/User"


const app = express();
dotenv.config();
const PORT = process.env.PORT;

// view engine 설정.
app.set("view engine", "pug");

// Middlewares (니코는 커넥션이라고 부리기도 함.)
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middlewares 직접 만든 변수
app.use(localsMiddleware);

// Routers
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);

app.listen(PORT, (req, res) => console.log("server on http://localhost:4000"));