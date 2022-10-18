import { AxiosInstance } from 'axios';
import { Response } from './user';

export const deleteCommentById = async (
  privateAxios: AxiosInstance,
  commentId: string,
  postId: string,
): Promise<Response> => {
  const res = await privateAxios({
    url: `/comment/${commentId}?postId=${postId}`,
    method: 'delete',
  });

  return res.data;
};

export const postComment = async (
  privateAxios: AxiosInstance,
  postId: string,
  content: string,
): Promise<Response> => {
  const res = await privateAxios({
    url: `/comment/${postId}`,
    method: 'post',
    data: {
      content,
    },
  });

  return res.data;
};

export const updateCommnetById = async (
  privateAxios: AxiosInstance,
  commentId: string,
  content: string,
): Promise<Response> => {
  const res = await privateAxios({
    url: `/comment/${commentId}`,
    method: 'put',
    data: {
      content,
    },
  });

  return res.data;
};
