import express from "express";
import routes from "../routes";
import {
  users,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
  userDetail,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middleWares";

const userRouter = express.Router();

userRouter.get(routes.home, users);
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
