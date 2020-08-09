import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import fetch from "node-fetch";

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
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

const findVideoById = async (req) => {
  const {
    params: { id },
  } = req;
  const video = await Video.findById(id)
    .populate("creator")
    .populate("comments");
  return video;
};

export const videoDetail = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    await fetch(`http://localhost:4000/api/${id}/view`, { method: "PUT" });
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
    if (video.creator.id !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
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
    await video.updateOne({ title, description });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await findVideoById(req);
    if (video.creator.id !== req.user.id) {
      throw Error();
    } else {
      await video.deleteOne();
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// api - register view

export const putRegisterView = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id);
    video.views++;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// api - add comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
