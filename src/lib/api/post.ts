import { AxiosInstance } from 'axios';
import { publicAxios } from '../axios';
import { Post } from '../types';
import { Response } from './user';

export interface getPostListResp {
  postList: Post[];
}

export const getAllPost = async (): Promise<getPostListResp> => {
  const res = await publicAxios({
    url: '/post/all',
    method: 'get',
  });

  return { postList: res.data.postList };
};

export const getPostItem = async (postId: string): Promise<Post> => {
  const res = await publicAxios({
    url: `/post/${postId}`,
    method: 'get',
  });

  return res.data;
};

export const deletePostItem = async (
  privateAxios: AxiosInstance,
  postId: string,
): Promise<Post> => {
  const res = await privateAxios({
    url: `/post/${postId}`,
    method: 'delete',
  });

  return res.data;
};

type updatePostParams = {
  postId: string;
  title: string;
  content: string;
};

export const updatePostItem = async (
  privateAxios: AxiosInstance,
  data: updatePostParams,
): Promise<Response> => {
  const res = await privateAxios({
    url: `/post/${data.postId}`,
    method: 'put',
    data: {
      title: data.title,
      content: data.content,
    },
  });

  return res.data;
};

export const registerPostItem = async (
  privateAxios: AxiosInstance,
  content: string,
  title: string,
): Promise<Response> => {
  const res = await privateAxios({
    url: `/post/register`,
    method: 'post',
    data: {
      title,
      content,
    },
  });

  return res.data;
};
