import Role from "../Model/Role.model";
import { Request, NextFunction, Response } from "express";
import { deleteFile } from "../utils/imageDelete";
import Post from "../Model/Post.model";
import PostMedia from "../Model/PostMedia.model";
import User from "../Model/user.model";
import Comment from "../Model/Comment.model";
// import {commentInterface} from "../interfaces/comment"
interface postBody extends Request {
  user?: {
    isAuthenticated: boolean;
    userId: number | undefined;
    isAdmin: boolean;
  };
}

export const CreatePost = async (
  req: postBody,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("\n\n\n\n\n\nReq body ", req.body);
    let post = await Post.create({
      description: req.body.description,
      UserId: req.user ? req.user.userId : 1,
    });

    if (req.files) {
      let postMedia = [];

      for (let file of req.files as Express.Multer.File[]) {
        postMedia.push({
          PostId: post.id,
          mediaUrl: file.path,
        });
      }
      // console.log("🚀 ~ file: post.controller.js ~ line 40 ~");
      await PostMedia.bulkCreate(postMedia);
    }

    let createdPost = await Post.findByPk(post.id, {
      include: [
        {
          model: User,
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "profileImageUrl",
            "RoleId",
          ],
        },
        { model: PostMedia },
      ],
    });
    res.status(201).json(createdPost);
  } catch (e) {
    res.status(500).json({ message: "something went wrong in creating Posts" });
    console.trace(e);
  }
};

export const editPost = async (
  req: postBody,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: PostMedia }],
    });
    if (!post) {
      return res.status(400).json({ message: "Post does not found" });
    }

    if (req.user && req.user.userId !== post.UserId) {
      return res
        .status(400)
        .json({ message: "Only orignal creator can delete the post" });
    }

    post.description = req.body.description;
    if (req.files) {
      let postMedia = [];

      for (let file of req.files as Express.Multer.File[]) {
        postMedia.push({
          PostId: post.id,
          mediaUrl: file.path,
        });
      }
      // console.log("🚀 ~ file: post.controller.js ~ line 40 ~");
      await PostMedia.bulkCreate(postMedia);
    }

    await post.save();
    await post.reload();
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: "something went wrong in editing Posts" });
    console.trace(e);
  }
};

export const deletePost = async (
  req: postBody,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: PostMedia }],
    });
    if (!post) {
      return res.status(400).json({ message: "Post does not found" });
    }

    if (req.user && req.user.userId !== post.UserId) {
      return res
        .status(400)
        .json({ message: "Only orignal creator can delete the post" });
    }
    const deletedPost = await Post.destroy({ where: { id: req.params.id } });

    const media = await PostMedia.destroy({ where: { PostId: req.params.id } });
    if (post.PostMedia.length !== 0) {
      for (let postMedia of post.PostMedia) {
        deleteFile(postMedia.mediaUrl);
      }
    }
    res.status(200).json({ message: "post deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong in Deleting Posts" });
    console.trace(e);
  }
};

export const fetchPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page: string = String(req.query.page) || "1";
    const limit: string = String(req.query.limit) || "10";
    // console.log("===============>>>>>>>>>>", page, limit);
    // const { page, limit = 0 } = req.query;
    // const comments = await Comment.findAll({
    //   // { include: [{ all: true }] }
    //   include: [
    //     {
    //       model: Comment,
    //       include: [
    //         {
    //           model: Comment,
    //           include: [
    //             {
    //               model: Comment,
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // });

    const posts = await Post.findAll({
      include: [
        {
          model: User,

          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "profileImageUrl",
            "RoleId",
          ],
        },
        { model: PostMedia },
        {
          model: Comment,

          include: [
            {
              model: User,

              attributes: [
                "id",
                "firstName",
                "lastName",
                "email",
                "profileImageUrl",
                "RoleId",
              ],
            },
            {
              model: Comment,

              include: [
                {
                  model: Comment,
                },
                {
                  model: User,

                  attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "email",
                    "profileImageUrl",
                    "RoleId",
                  ],
                },
              ],
            },
          ],
        },
      ],

      // offset: page ? (parseInt(page) - 1) * parseInt(limit) : 0,
      // limit: limit ? parseInt(limit) : 0,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ message: "something went wrong in Fetching Posts" });
    console.trace(e);
  }
};

export const fetchPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "profileImageUrl",
            "RoleId",
          ],
        },
        { model: PostMedia },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: [
                "id",
                "firstName",
                "lastName",
                "email",
                "profileImageUrl",
                "RoleId",
              ],
            },
            {
              model: Comment,
              include: [
                {
                  model: User,
                  attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "email",
                    "profileImageUrl",
                    "RoleId",
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: "something went wrong in Fetching Post" });
    console.trace(e);
  }
};

export const deletePostImage = async (
  req: postBody,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: PostMedia }],
    });
    if (!post) {
      return res.status(400).json({ message: "Post does not found" });
    }

    if (req.user && req.user.userId !== post.UserId) {
      return res
        .status(400)
        .json({ message: "Only orignal creator can delete the post" });
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
    res.status(500).json({ message: "something went wrong in editing Post" });
    console.trace(e);
  }
};
