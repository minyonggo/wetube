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
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileURL: path,
    title,
    description,
  });
  console.log(req.body, req.file);
  // To Do : Upload and save Video
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id);
    console.log(video);
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
