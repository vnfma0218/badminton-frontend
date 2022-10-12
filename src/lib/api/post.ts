import { publicAxios } from '../axios';
import { Post } from '../types';

export interface getPostResp {
  postList: Post[];
}

export const getAllPost = async (): Promise<getPostResp> => {
  const res = await publicAxios({
    url: '/post/all',
    method: 'get',
  });

  return { postList: res.data.postList };
};
