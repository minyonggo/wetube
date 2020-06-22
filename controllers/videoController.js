import routes from "../routes";
import Video from "../models/Video";

// Global
export const home = async (req, res) => {
  try {
    const videoDB = await Video.find({});
    res.render("home", { pageTitle: "Home", videoDB });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videoDB: [] });
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videoDB });
};

// Videos
export const videos = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = (req, res) => {
  const {
    body: { file, title, description },
  } = req;
  console.log(req.body);
  // To Do : Upload and save Video
  res.redirect(routes.videoDetail(333311));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
