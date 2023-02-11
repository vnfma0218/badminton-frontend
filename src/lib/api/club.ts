import { AddressInfo } from '@/components/Kakao/KaKaoMap';
import { AxiosInstance } from 'axios';

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
