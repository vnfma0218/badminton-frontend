import { useAppSelector } from '@/store/hooks';
import { authState } from '@/store/slices/authSlice';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type Profile = {
  profileFile: File[];
  nickname: string;
  intro: string;
  clubName: string;
  peroid: string;
  level: 'A' | 'B' | 'C' | 'D';
};

const ProfileEditPage = () => {
  const { nickname } = useAppSelector(authState);
  const [avatarPreview, setAvatarPreview] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Profile>();
  const { ref, ...rest } = register('profileFile');
  const avatar = watch('profileFile');

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      console.log();
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFileClick = () => {
    fileRef.current?.click();
  };

  console.log(watch());

  return (
    <div className='mt-32 flex'>
      {/* 유저 프로필 정보 */}
      <div className='card w-96 bg-base-100 shadow-xl py-11'>
        <div className='flex justify-center'>
          <span className='border w-36 h-36 rounded-full cursor-pointer' onClick={onFileClick}>
            <img src={avatarPreview} alt='' className='w-full h-full rounded-full' />
          </span>
          <input type='file' ref={fileRef} hidden {...rest} />
          {/* <input type='file' {...register('profileFile')} /> */}
        </div>
        <div className='text-center mt-8'>
          <input
            type='text'
            className='input input-primary h-8'
            {...register('nickname', {
              minLength: {
                value: 2,
                message: '이름은 최소 2글자 이상 입력해주세요',
              },
              maxLength: 10,
              required: '이름을 입력해주세요',
            })}
          />
        </div>
        <div className='text-center mt-8'>
          <textarea
            className='input input-primary h-20 text-xs w-4/5'
            {...register('intro', {
              minLength: {
                value: 2,
                message: '자기소개는 2글자 이상 입력해주세요',
              },
              maxLength: 150,
              required: '이름을 입력해주세요',
            })}
          />
        </div>
      </div>
      {/* 유저 배드민턴 정보 */}
      <div className='ml-24'>
        <div>
          <h3 className='text-2xl'>소속 클럽</h3>
          <p>목감 클럽</p>
        </div>
      </div>
    </div>
  );
};
export default ProfileEditPage;
