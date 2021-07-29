import React, { FC, useState, useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  getPosts,
  getPost,
  createPost,
  removePost,
  addCommentToPostApi,
} from "./Api";
// import history from "../../history";
import { Post } from "../../Interfaces/Post";

export const PostContext = React.createContext({
  posts: [],
  singlePost: null,
  CreatePost: (data: FormData) => {},
  deletePost: (id: number) => {},
  deletePostImage: (id: number, imageId: number) => {},
  editPost: (data: FormData) => {},
  fetchPosts: () => {},
  fetchPost: (id: number) => {},
  setSinglePost: (value: React.SetStateAction<Post>) => {},
  addCommentToPost: (
    postId: number,
    rootId: number | number,
    comment: string
  ) => {},
});

export const PostProvider: FC = (props): JSX.Element => {
  const { setLoading } = useContext(AuthContext);
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
  const CreatePost = async (data: FormData) => {
    setLoading(true);
    const newPost = await createPost(data);
    const list = [newPost, ...posts];
    setPosts(list);
    setLoading(false);
  };

  const deletePost = async (id: number) => {
    setLoading(true);
    await removePost(id);
    const list = posts.filter((post) => post.id !== id);
    setPosts(list);
    setLoading(false);
  };
  const deletePostImage = (id: number, imageId: number) => {};

  const editPost = (data: FormData) => {};

  const addCommentToPost = async (
    postId: number,
    rootId: number | number,
    comment: string
  ) => {
    setLoading(true);
    const post = await addCommentToPostApi(postId, rootId, comment);

    let list: Post[] = [];
    // const list = posts.filter((post) => post.id !== postId);
    for (let item of posts) {
      if (item.id === postId) {
        list.push(post);
      } else {
        list.push(item);
      }
    }

    setPosts([...list]);
    setLoading(false);
  };
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
        setSinglePost,
        addCommentToPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
