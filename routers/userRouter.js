import express from 'express';
import routes from '../routes';
import { users, editProfile, changePassword, userDetail } from '../controllers/userController';
import { onlyPrivate } from '../middleWares';

const userRouter = express.Router();

userRouter.get(routes.home, users);
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;