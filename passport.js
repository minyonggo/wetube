import passport from "passport";
import githubPassport from "passport-github";
import User from "./models/User";
import routes from "./routes";
import { afterGithubCallback } from "./controllers/userController";
import dotenv from 'dotenv';

dotenv.config();
const GithubStrategy = githubPassport.Strategy;

// local strategy with mongoDB
passport.use(User.createStrategy());

// Github strategy
passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GH_ID,
            clientSecret: process.env.GH_SECRET,
            callbackURL: `http://localhost:4000${routes.auth + routes.githubCallback}`
        },
        afterGithubCallback
    )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());