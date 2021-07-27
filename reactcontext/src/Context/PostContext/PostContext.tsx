import React, { FC, useState } from "react";
import { getPosts, getPost } from "./Api";
// import history from "../../history";
import { Post } from "../../Interfaces/Post";

export const PostContext = React.createContext({
  posts: [],
  singlePost: null,
  CreatePost: (data: Post) => {},
  deletePost: (id: number) => {},
  deletePostImage: (id: number, imageId: number) => {},
  editPost: (data: Post) => {},
  fetchPosts: () => {},
  fetchPost: (id: number) => {},
});

export const PostProvider: FC = (props): JSX.Element => {
  const { children } = props;
  const [posts, setPosts] = useState<Post[]>([]);
  const [singlePost, setSinglePost] = useState<Post>(null);

  const fetchPosts = async () => {
    const result = await getPosts();
    setPosts(result);
  };

  const fetchPost = async (id: number) => {
    const result = await getPost(id);
    setSinglePost(result);
  };
  const CreatePost = (data: Post) => {};

  const deletePost = (id: number) => {};
  const deletePostImage = (id: number, imageId: number) => {};

  const editPost = (data: Post) => {};
  return (
    <PostContext.Provider
      value={{
        posts,
        singlePost,
        CreatePost,
        deletePost,
        deletePostImage,
        editPost,
        fetchPosts,
        fetchPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
