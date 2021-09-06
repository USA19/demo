import { Post } from 'src/model/post.model';

export interface GetPostsResponse {
  posts: Post[];
  count: number;
}

export interface PostResponse {
  post: Post;
}

export interface DeletePostResponse {
  message: string;
}
