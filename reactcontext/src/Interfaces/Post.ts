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
  Comments?: any[];
  User: PostUser;
}

interface PostImage {
  id: number;
  PostId: number;
  mediaUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface createPost {
  description: string;
}