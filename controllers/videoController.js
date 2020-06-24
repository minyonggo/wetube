import routes from "../routes";
import Video from "../models/Video";

// Global
export const home = async (req, res) => {
  try {
    const videoDB = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videoDB });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videoDB: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
    res.render("search", { pageTitle: "Search", searchingBy, videos });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
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

const findVideoById = async (req) => {
  const {
    params: { id },
  } = req;
  const video = await Video.findById(id);
  return video;
};

export const videoDetail = async (req, res) => {
  try {
    const video = await findVideoById(req);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  try {
    const video = await findVideoById(req);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  try {
    const {
      body: { title, description },
    } = req;
    const video = await findVideoById(req);
    await video.updateOne({ title }, { description });
    console.log(title, description);
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await findVideoById(req);
    await video.deleteOne();
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
