import { useContext, useEffect } from 'react';
import AuthContext from 'src/components/contexts/AuthContext';
import { privateAxios } from 'src/lib/axios';
import useRefreshToken from './useRefreshToken';

const usePrivateAxios = () => {
  const { accessToken } = useContext(AuthContext);
  console.log('accessToken', accessToken);
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
        console.log(error);
        Promise.reject(error);
      }
    );

    const responseIntercept = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return privateAxios(prevRequest);
        }
        console.log(error);
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
