import type { NextPage } from 'next';
import { useContext } from 'react';
import Navigation from 'src/components/Layout/Navigation';
import AuthContext from 'src/contexts/AuthContext';

const Home: NextPage = () => {
  const { accessToken } = useContext(AuthContext);
  console.log(accessToken);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
