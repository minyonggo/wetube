import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("dev"));

app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

export default app;
