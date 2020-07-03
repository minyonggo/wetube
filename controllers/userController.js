import routes from "../routes";
import User from "../models/User";

// Global
export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    res.render("join", { pageTitle: "Join" });
    res.status(400);
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      res.redirect(routes.home);
    } catch (error) {
      console.log(error);
    }
    //To do : Log user in
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = (req, res) => {
  //To do : confirm user
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  res.locals.user = {
    isAuthenticated: false,
    id: null,
  };
  res.redirect(routes.home);
};

// Users
export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
