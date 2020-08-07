import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import mongoStore from "connect-mongo";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import locals from "./middleWares";
import routes from "./routes";
import session from "express-session";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import "./passport";
import passport from "passport";
import authRouter from "./routers/authRouter";

const app = express();
dotenv.config();

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const CookieStore = mongoStore(session);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new CookieStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(locals);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.auth, authRouter);

export default app;
