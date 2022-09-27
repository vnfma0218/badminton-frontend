import { useContext, useEffect } from 'react';
import AuthContext from 'src/contexts/AuthContext';
import { privateAxios } from 'src/lib/axios';
import useRefreshToken from './useRefreshToken';

const usePrivateAxios = () => {
  const { accessToken } = useContext(AuthContext);
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
      }
    );

    const responseIntercept = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          console.log(error);
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log(newAccessToken);
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return privateAxios(prevRequest);
        }
        // console.log(e  rror);
        return Promise.reject(error);
      }
    );

    return () => {
      privateAxios.interceptors.request.eject(requrestIntercept);
      privateAxios.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return privateAxios;
};
export default usePrivateAxios;
