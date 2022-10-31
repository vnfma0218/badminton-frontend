import { useAppSelector } from '@/store/hooks';
import { authState } from '@/store/slices/authSlice';
import { useForm } from 'react-hook-form';

type Profile = {
  nickname: string;
  intro: string;
  clubName: string;
  peroid: string;
  level: 'A' | 'B' | 'C' | 'D';
};

const ProfileEditPage = () => {
  const { nickname } = useAppSelector(authState);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Profile>();

  return (
    <div className='mt-32'>
      <div className='card w-96 bg-base-100 shadow-xl py-11'>
        <div className='flex justify-center'>
          <span className='border w-24 h-24 rounded-full bg-slate-600 cursor-pointer'></span>
          <input type='file' hidden />
        </div>
      </div>
    </div>
  );
};
export default ProfileEditPage;
