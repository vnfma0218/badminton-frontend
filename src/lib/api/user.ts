import { privateAxios, publicAxios } from '../axios';

type RequestLogin = {
  email: string;
  password: string;
};

export interface Response {
  message: string;
  resultCode: string;
}

interface LoginResp extends Response {
  userId: string;
  accessToken: string;
}

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
