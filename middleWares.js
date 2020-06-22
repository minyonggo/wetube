import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "videos/" });
export const uploadVideo = multerVideo.single("videoFile");

const locals = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 5,
  };
  next();
};

export default locals;
