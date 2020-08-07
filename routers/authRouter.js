import express from 'express';
import routes from '../routes';
import { githubLogin, githubLoginCallback, githubLoginSuccess } from '../controllers/userController';
const authRouter = express.Router();

authRouter.get(routes.github, githubLogin);
authRouter.get(routes.githubCallback, githubLoginCallback, githubLoginSuccess);

export default authRouter;