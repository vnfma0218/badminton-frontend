import Post from '@/components/Home/Post';
import type { NextPage } from 'next';
import { useState } from 'react';

const Home: NextPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 'p1',
      title: '목감동에서 치실분!',
      neededPeople: 5,
      loacation: '시흥시 목감동',
      userImg: '/img/user1.jpg',
    },
    {
      id: 'p2',
      title: '2명 급구 합니다',
      neededPeople: 2,
      loacation: '광명시 하안동',
      userImg: '/img/user2.jpg',
    },
  ]);
  return (
    <div className='container px-4 py-3'>
      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          neededPeople={post.neededPeople}
          loacation={post.loacation}
          userImg={post.userImg}
        />
      ))}
    </div>
  );
};

export default Home;
