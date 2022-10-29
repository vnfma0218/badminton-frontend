import { privateAxios, publicAxios } from '../axios';
import { ResponseData } from './post';

type RequestLogin = {
  email: string;
  password: string;
};

export interface Response {
  message: string;
  resultCode: '0000' | '9999';
}

interface LoginResp extends Response {
  userId: string;
  accessToken: string;
  nickname: string;
}

export type Notification = {
  content: string;
  from: string;
  created_at: string;
};

export const login = async (data: RequestLogin): Promise<LoginResp> => {
  const res = await publicAxios({
    url: '/login',
    method: 'post',
    data,
  });

  return {
    resultCode: res.data.resultCode,
    message: res.data.message,
    userId: res.data.userId,
    accessToken: res.data.accessToken,
    nickname: res.data.nickname,
  };
};

export const logout = async (accessToken: string): Promise<Response> => {
  const res = await privateAxios({
    url: '/logout',
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    resultCode: res.data.resultCode,
    message: res.data.message,
  };
};

export const getUserNotification = async (
  accessToken: string,
): Promise<ResponseData<{ notiList: Notification[] }>> => {
  const res = await privateAxios({
    url: '/noti/all',
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};
