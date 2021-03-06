import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import { logout, getJoin, postJoin, getLogin, postLogin, myProfile } from '../controllers/userController';
import { onlyPrivate, onlyPublic } from '../middleWares';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.myProfile, myProfile);

export default globalRouter;