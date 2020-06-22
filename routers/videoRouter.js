import express from "express";
import routes from "../routes";
import {
  videos,
  videoDetail,
  editVideo,
  deleteVideo,
  getUpload,
  postUpload,
} from "../controllers/videoController";
import { uploadVideo } from "../middleWares";

const videoRouter = express.Router();

videoRouter.get("/", videos);
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
