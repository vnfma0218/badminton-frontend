import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../components/contexts/AuthContext';

const Home: NextPage = () => {
  const { accessToken } = useContext(AuthContext);
  console.log(accessToken);

  return <div>Home page</div>;
};

export default Home;
