import { useEffect, useState } from 'react';
import { privateAxios, publicAxios } from 'src/lib/axios';
import { Post } from 'src/lib/types';
import { useAppSelector } from 'src/store/hooks';
import { authState } from 'src/store/slices/authSlice';

const PostListPage = () => {
  const { userId } = useAppSelector(authState);
  const [postList, setPostList] = useState<Post[]>([]);
  useEffect(() => {
    const getAllPost = async () => {
      const {
        data: { postList },
      } = await publicAxios.get(`/post/all`);

      setPostList(postList);
    };

    getAllPost();
  }, []);

  const onDeletePost = async (postId: string) => {
    const { data } = await privateAxios.post('/delete', {
      body: {
        postId,
      },
    });

    console.log(data);
  };

  return (
    <section className="post-section">
      <ul className="post-list">
        {postList.map((post, idx) => {
          return (
            <li className="post" key={`${post.content}-${idx}`}>
              <div className="writer">{`글쓴이 ${
                post.user.email.split('@')[0]
              }`}</div>
              <div className="content">{post.content}</div>
              {post.myPostYn && (
                <div className="btns">
                  <button
                    className="del-btn"
                    onClick={() => onDeletePost(post.id)}
                  >
                    삭제
                  </button>
                  <button className="modify-btn">수정</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PostListPage;
