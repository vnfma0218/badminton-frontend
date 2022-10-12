import ToastModal from '@/components/Modal/ToastModal';
import { alertState, updateAlertState } from '@/store/slices/AlertSlice';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import usePrivateAxios from 'src/hooks/usePrivateAxios';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

type PostInputs = {
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
      const { data } = await privateAxios({
        url: '/post/register',
        method: 'post',
        data: {
          content,
          title,
        },
      });
      if (data.resultCode === '0000') {
        reset();
      }
      if (data.resultCode === '422') {
        dispatch(updateAlertState({ message: data.message }));
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
