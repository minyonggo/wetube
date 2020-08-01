import routes from "../routes";
import User from "../models/User";
import passport from "passport";

// Global
export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    res.redirect(routes.join);
    res.status(400);
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

// Users
export const users = (req, res) => res.render("users", { pageTitle: "Users", user: req.user });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
export const userDetail = async (req, res) => {
  const { params: { id } } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail" });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const myProfile = (req, res) => res.render("userDetail", { pageTitle: "User Detail", user: req.user });


// Github
export const githubLogin = passport.authenticate("github");
export const githubLoginCallback = passport.authenticate("github", { failureRedirect: routes.login });
export const githubLoginSuccess = (req, res) => {
  res.redirect(routes.home);
};
export const afterGithubCallback = async (accessToken, refreshToken, profile, cb) => {
  const { _json: { id, avatar_url, name, email } } = profile;
  try {
    const user = await User.findOne({ email });

    // if user who uses same email exists
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({ email, name, githubId: id, avatarUrl: avatar_url });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};