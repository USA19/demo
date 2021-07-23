import express from "express";
const router = express.Router();
import { CreatePost, deletePost } from "../controller/post.controller";
import { isAuthenticated } from "../utils/auth";
import { postImageHandler } from "../utils/imageUpload";

router.post("/uploadPost", isAuthenticated, postImageHandler, CreatePost);
router.delete("/deletePost/:id", isAuthenticated, deletePost);

export default router;
