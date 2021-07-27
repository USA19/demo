import server from "../BaseApi/server";
import { Post } from "../../Interfaces/Post";

import { AxiosResponse } from "axios";

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await server.get("/getPosts");

    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getPost = async (id: number): Promise<Post> => {
  try {
    const response = await server.get(`/getPost/${id}`);

    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const createPost = async (data: Post): Promise<Post> => {
  try {
    const response: AxiosResponse<Post> = await server.post(
      "/uploadPost",
      data
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const editPost = async (data: Post): Promise<Post> => {
  try {
    const response: AxiosResponse<Post> = await server.put(
      `/editPost/${data.id}`,
      data
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const deletePost = async (id: number): Promise<boolean> => {
  try {
    await server.delete(`/deletePost/${id}`);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deletePostImage = async (
  id: number,
  imageId: number
): Promise<boolean> => {
  try {
    await server.delete(`/deletePost/${id}/${imageId}`);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
