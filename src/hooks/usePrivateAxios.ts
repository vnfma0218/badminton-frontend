import { useEffect } from 'react';
import { privateAxios } from 'src/lib/axios';
import { useAppSelector } from 'src/store/hooks';
import { authState } from 'src/store/slices/authSlice';
import useRefreshToken from './useRefreshToken';

const usePrivateAxios = () => {
  const { accessToken } = useAppSelector(authState);
  const refresh = useRefreshToken();

  useEffect(() => {
    const requrestIntercept = privateAxios.interceptors.request.use(
      (config) => {
        if (config.headers && !config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },

      (error) => {
        console.log('error', error);
        Promise.reject(error);
      },
    );

    const responseIntercept = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          console.log(error);
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return privateAxios(prevRequest);
        }
        // console.log(e  rror);
        return Promise.reject(error);
      },
    );

    return () => {
      privateAxios.interceptors.request.eject(requrestIntercept);
      privateAxios.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken]);

  return privateAxios;
};
export default usePrivateAxios;
