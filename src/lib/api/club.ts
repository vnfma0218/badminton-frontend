import { AddressInfo } from '@/components/Kakao/KaKaoMap';
import { AxiosInstance } from 'axios';
import { publicAxios } from '../axios';
import { Club } from '../types';
import { ResponseData } from './post';
import { Response } from './user';
export const postClub = async (
  privateAxios: AxiosInstance,
  data: AddressInfo & { name: string },
): Promise<Response> => {
  const res = await privateAxios({
    url: '/add-club',
    method: 'post',
    data: data,
  });

  return res.data;
};
export const getNearClubList = async (params: { lat: number; lng: number }): Promise<Club[]> => {
  const res = await publicAxios({
    url: '/club-list',
    method: 'get',
    params: params,
  });

  return res.data;
};
export const getClubListByName = async (params: {
  name: string;
}): Promise<ResponseData<Club[]>> => {
  const res = await publicAxios({
    url: '/search/club-list',
    method: 'get',
    params: params,
  });

  return res.data;
};
