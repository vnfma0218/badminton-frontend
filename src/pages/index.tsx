import type { NextPage } from 'next';
import { useContext } from 'react';
import AuthContext from 'src/contexts/AuthContext';

const Home: NextPage = () => {
  const { accessToken } = useContext(AuthContext);
  console.log(accessToken);

  return <div>Home page</div>;
};

export default Home;
