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
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

// Users
export const users = (req, res) =>
  res.render("users", { pageTitle: "Users", user: req.user });

export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit Profile", user: req.user });
};
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.render("userDetail", { pageTitle: "Edit Profile", user: req.user });
  } catch (error) {
    res.render("editProfile", { pageTitle: "Edit Profile" });
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
export const postChangePassword = async (req, res) => {
  const {
    body: { currentPassword, newPassword1, newPassword2 },
  } = req;
  try {
    if (newPassword1 !== newPassword2) {
      return res.status(400).redirect("changePassword");
    }
    await req.user.changePassword(currentPassword, newPassword1);
    res.redirect(routes.myProfile);
  } catch (error) {
    res.render("changePassword", { pageTitle: "Change Password" });
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};
// Github
export const githubLogin = passport.authenticate("github");
export const githubLoginCallback = passport.authenticate("github", {
  failureRedirect: routes.login,
});
export const githubLoginSuccess = (req, res) => {
  res.redirect(routes.home);
};
export const afterGithubCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });

    // if user who uses same email exists
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};
