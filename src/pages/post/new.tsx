import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import usePrivateAxios from 'src/hooks/usePrivateAxios';
import { useAppSelector } from 'src/store/hooks';
import { authState } from 'src/store/slices/authSlice';

const RegisterPostPage = () => {
  const [content, setContent] = useState<string>('');
  const auth = useAppSelector(authState);
  const privateAxios = usePrivateAxios();
  const submitPost = async (e: FormEvent) => {
    e.preventDefault();

    const res = await privateAxios({
      url: '/post/register',
      method: 'post',
      data: {
        content,
      },
    });

    console.log(res.data);
  };

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target.value) return;
    setContent(e.target.value);
  };

  return (
    <div>
      <form onSubmit={submitPost}>
        <label htmlFor="content">
          <textarea
            onChange={onChangeContent}
            placeholder="포스트 작성해주세요"
          ></textarea>
        </label>
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default RegisterPostPage;
