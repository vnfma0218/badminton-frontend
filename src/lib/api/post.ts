import { AxiosInstance } from 'axios';
import { publicAxios } from '../axios';
import { Comment, Post } from '../types';
import { Response } from './user';

type ResponseData<T> = {
  resultCode: '0000' | '9999';
  dataList: T;
};

export interface getPostListResp {
  postList: Post[];
  totalCnt: number;
}
export interface getPostItemResp {
  post: Post;
  comments: Comment[];
  myPostYn: boolean;
}

export const getAllPost = async (
  page: number,
  limit: number,
): Promise<ResponseData<getPostListResp>> => {
  const res = await publicAxios({
    url: '/post/all',
    method: 'get',
    params: {
      page,
      limit,
    },
  });

  return res.data;
};

export const getPostItem = async (postId: string): Promise<getPostItemResp> => {
  const res = await publicAxios({
    url: `/post/${postId}`,
    method: 'get',
  });

  return res.data;
};

export const deletePostItem = async (
  privateAxios: AxiosInstance,
  postId: string,
): Promise<Response> => {
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
