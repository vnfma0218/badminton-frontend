import { publicAxios } from 'src/lib/axios';
import { useAppDispatch } from 'src/store/hooks';
import { updateAuthState } from 'src/store/slices/authSlice';

const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const refresh = async () => {
    console.log('refresh 요청');

    const response = await publicAxios.get('refresh', {
      withCredentials: true,
    });

    const { userId, accessToken } = response.data;
    dispatch(updateAuthState({ accessToken, userId }));
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
