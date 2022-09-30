import axios from 'axios';
import { FormEvent } from 'react';
import usePrivateAxios from 'src/hooks/usePrivateAxios';
import { useAppSelector } from 'src/store/hooks';
import { authState } from 'src/store/slices/authSlice';

const RegisterPostPage = () => {
  const auth = useAppSelector(authState);
  console.log(auth);
  const privateAxios = usePrivateAxios();
  const submitPost = async (e: FormEvent) => {
    e.preventDefault();

    const res = await privateAxios({
      url: 'post/register',
      method: 'post',
      data: {
        content: '글쓰기',
      },
    });

    console.log(res.data);
  };

  return (
    <div>
      <form onSubmit={submitPost}>
        <label htmlFor="content">
          <textarea placeholder="포스트 작성해주세요"></textarea>
        </label>
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default RegisterPostPage;
