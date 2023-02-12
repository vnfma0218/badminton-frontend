import { AddressInfo } from '@/components/Kakao/KaKaoMap';
import { AxiosInstance } from 'axios';
import { publicAxios } from '../axios';
import { Club } from '../types';
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
