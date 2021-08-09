import { Request, Response, Router } from "express";
import multer, { FileFilterCallback } from "multer";
import Post from "../model/Post.model";

import PostMedia from "../model/PostMedia.model";
import { deleteFile } from "./imageDelete";

const router = Router();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const postImageHandler = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).any();

// const userImageHandler = multer({
//   storage: fileStorage,
//   fileFilter: fileFilter,
// }).single("image");

router.post(
  "/uploadPostImage/:postId",
  postImageHandler,
  async (req: Request, res: Response) => {
    try {
      if (req.files) {
        let postMedia = [];

        for (let file of req.files as Express.Multer.File[]) {
          postMedia.push({
            PostId: parseInt(req.params.postId),
            mediaUrl: file.path,
          });
        }
        // console.log("🚀 ~ file: post.controller.js ~ line 40 ~");
        const media: PostMedia[] = await PostMedia.bulkCreate(postMedia);
        res.status(200).json(media);
      }
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "something went wrong in uplaoding image" });
    }
  }
);

router.delete(
  "/deletePostImage",

  async (req: Request, res: Response) => {
    try {
      const post: Post | null = await Post.findByPk(req.params.id, {
        include: [{ model: PostMedia }],
      });
      if (!post) {
        return res.status(400).json({ message: "Post does not found" });
      }
      await PostMedia.destroy({
        where: { id: req.params.imageId },
      });

      for (let postMedia of post.PostMedia) {
        if (postMedia.id === parseInt(req.params.imageId)) {
          deleteFile(postMedia.mediaUrl);
        }
      }
      res.status(200).json({ message: "image deleted successfully" });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "something went wrong in uplaoding image" });
    }
  }
);

export default router;
