import Address, { addrInfo } from '@/components/Kakao/Address';
import { registerPostItem } from '@/lib/api/post';
import { updateAlertState } from '@/store/slices/AlertSlice';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import usePrivateAxios from 'src/hooks/usePrivateAxios';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

export type PostInputs = {
  content: string;
  title: string;
  neededPeople: string;
  location: string;
};

const RegisterPostPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm<PostInputs>({
    defaultValues: {
      neededPeople: '1',
    },
  });

  const dispatch = useAppDispatch();
  const privateAxios = usePrivateAxios();

  watch();
  const onSubmitPost = async (data: PostInputs) => {
    console.log('data', data);
    const { content, title } = data;
    return;
    // try {
    //   const { resultCode, message } = await registerPostItem(privateAxios, content, title);
    //   if (resultCode === '0000') {
    //     dispatch(updateAlertState({ message }));
    //     reset();
    //   }
    //   if (resultCode === '9999') {
    //     dispatch(updateAlertState({ message }));
    //   }
    // } catch (err: any) {
    //   dispatch(updateAlertState({ message: '로그인이 필요합니다' }));
    // }
  };
  const onSuccessAddr = (addrInfo: addrInfo) => {
    console.log('hello');
    console.log(addrInfo);
  };
  return (
    <div className='flex justify-center mt-7 px-5'>
      <form onSubmit={handleSubmit(onSubmitPost)} className='flex flex-col w-full'>
        <div className='form-control mb-5'>
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
            className='textarea textarea-primary w-full mb-2 h-40'
            name='content'
            placeholder='포스트 작성해주세요'
          ></textarea>
        </div>
        <div className='form-control'>
          <label className='mb-2'>필요인원 {getValues('neededPeople')}명</label>
          <input
            type='range'
            min='1'
            max='20'
            // value='40'
            className='range mb-4'
            {...register('neededPeople', {
              required: true,
            })}
          />
        </div>
        <div className='form-control'>
          <label className='mb-2'>위치</label>
          <div className='flex mb-3'>
            <Address onSuccessAddr={onSuccessAddr} />
            <button className='btn ml-2'>지도 검색</button>
          </div>
        </div>
        <button type='submit' className='btn btn-primary w-full'>
          업로드
        </button>
      </form>
    </div>
  );
};

export default RegisterPostPage;
