import { PostUser } from "./User";

export interface Post {
  id: number;
  description: string;
  UserId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  postmedia?: [];
  comments?: string[];
  PostMedia?: PostImage[];
  Comments?: commentInterface[];
  User: PostUser;
}

interface PostImage {
  id: number;
  PostId: number;
  mediaUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface commentInterface {
  id: number;
  comment: string;
  CommentId?: number;
  PostId?: number;
  UserId?: number;
  User: PostUser;
  Comments: commentInterface[];
}

export interface uploadedMedia {
  id: number;
  mediaUrl: string;
  createdAt: Date;
  updatedAt: Date;
  PostId: number;
}
