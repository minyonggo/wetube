import express from "express";
import routes from "../routes";
import {
  putRegisterView,
  postAddComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.put(routes.registerView, putRegisterView);
apiRouter.post(routes.addComments, postAddComment);

export default apiRouter;
