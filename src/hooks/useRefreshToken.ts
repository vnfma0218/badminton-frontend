import { useContext } from 'react';
import AuthContext from 'src/contexts/AuthContext';
import axios from 'src/lib/axios';

const useRefreshToken = () => {
  const { updateAuthState } = useContext(AuthContext);

  const refresh = async () => {
    console.log('refresh 요청');

    const response = await axios.get('refresh', {
      withCredentials: true,
    });
    updateAuthState(response.data.accessToken, 'user');
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
