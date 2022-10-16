import { registerPostItem } from '@/lib/api/post';
import { updateAlertState } from '@/store/slices/AlertSlice';
import { useForm } from 'react-hook-form';
import usePrivateAxios from 'src/hooks/usePrivateAxios';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

export type PostInputs = {
  content: string;
  title: string;
};

const RegisterPostPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PostInputs>();

  const dispatch = useAppDispatch();
  const privateAxios = usePrivateAxios();

  const onSubmitPost = async (data: PostInputs) => {
    console.log('data', data);
    const { content, title } = data;
    try {
      const { resultCode, message } = await registerPostItem(privateAxios, content, title);
      if (resultCode === '0000') {
        dispatch(updateAlertState({ message }));
        reset();
      }
      if (resultCode === '422') {
        dispatch(updateAlertState({ message }));
      }
    } catch (err: any) {
      dispatch(updateAlertState({ message: '로그인이 필요합니다' }));
    }
  };

  return (
    <div className='flex justify-center mt-7'>
      <form onSubmit={handleSubmit(onSubmitPost)} className='flex flex-col w-1/2'>
        <div className='form-control mb-7'>
          <label className='mb-2'>제목</label>
          <input
            {...register('title', {
              required: true,
              minLength: 5,
            })}
            type='text'
            name='title'
            placeholder='제목'
            className='input input-primary'
          />
        </div>
        <div className='form-control'>
          <label className='mb-2'>내용</label>
          <textarea
            {...register('content', {
              required: true,
              minLength: 10,
            })}
            className='textarea textarea-primary w-full mb-6 h-40'
            name='content'
            placeholder='포스트 작성해주세요'
          ></textarea>
        </div>
        <button type='submit' className='btn btn-primary w-full'>
          글쓰기
        </button>
      </form>
    </div>
  );
};

export default RegisterPostPage;
