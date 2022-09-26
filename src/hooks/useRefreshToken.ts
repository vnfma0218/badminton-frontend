import { useContext } from 'react';
import AuthContext from 'src/components/contexts/AuthContext';
import axios from 'src/lib/axios';

const useRefreshToken = () => {
  const { updateAuthState } = useContext(AuthContext);

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });
    console.log(response.data);
    updateAuthState(response.data.accessToken, 'user');
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
