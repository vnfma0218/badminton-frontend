import { useAppSelector } from '@/store/hooks';
import { authState } from '@/store/slices/authSlice';
import { useRouter } from 'next/router';

const MyInfoPage = () => {
  const { nickname } = useAppSelector(authState);
  const router = useRouter();
  return (
    <div className='mt-32 flex'>
      {/* 프로필 카드 */}
      <div className='card w-96 bg-base-100 shadow-xl py-11'>
        <div>
          <div className='w-24 h-24 rounded-full bg-slate-600 flex justify-center m-auto'></div>
        </div>
        <div className='card-body items-center text-center'>
          <h2 className='card-title'>{nickname}</h2>
          <p className='mt-4'>
            내 소개글입니다 .... 내 소개글입니다 .... 내 소개글입니다 .... 내 소개글입니다 ....
          </p>
        </div>
        <div className='text-center'>
          <button
            className='btn'
            onClick={() => {
              router.push('/myInfo/edit');
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
      {/* 회원 클럽정보 */}
      <div className='ml-32 mt-7'>
        <div>
          <p className='text-2xl'>클럽 정보</p>
          <p className='text-3xl mt-3'>목감 클럽 (일반 회원)</p>
        </div>
        <div className='mt-10'>
          <p className='text-2xl'>활동기간</p>
          <p className='text-3xl mt-3'>2009~2022 (11년)</p>
        </div>
        <div className='mt-10'>
          <p className='text-2xl'>급수</p>
          <p className='text-3xl mt-3'>A조</p>
        </div>
      </div>
    </div>
  );
};
export default MyInfoPage;
