import type { NextPage } from 'next';
import { useEffect } from 'react';
import axios from 'axios';

const Home: NextPage = () => {
  useEffect(() => {
    axios.get('http://localhost:3001/home').then((res) => console.log(res));
  }, []);
  return <div>Home page</div>;
};

export default Home;
