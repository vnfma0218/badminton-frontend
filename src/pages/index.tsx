import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <button onClick={() => alert('확인')}>버튼</button>
      <h1>홈</h1>
    </div>
  );
};

export default Home;
