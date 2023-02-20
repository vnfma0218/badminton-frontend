import ClubListModal from '@/components/myInfo/modals/ClubListModal';
import usePrivateAxios from '@/hooks/usePrivateAxios';
import { getUserById, User } from '@/lib/api/user';
import { useAppSelector } from '@/store/hooks';
import { authState } from '@/store/slices/authSlice';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const MyInfoPage = () => {
  const privateAxios = usePrivateAxios();
  const { nickname, accessToken } = useAppSelector(authState);
  const router = useRouter();
  const modalRef = useRef(null);
  const [user, setUser] = useState<User>();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUserById(privateAxios);
      // res
      setUser(res.dataList.user);
    };
    if (accessToken) {
      getUserInfo();
    }
  }, [accessToken]);

  const clickRegisterClub = () => {
    setTimeout(() => {
      (modalRef.current as any).click();
    }, 100);
    setShowModal(true);
  };

  const onCancelModal = () => {
    setShowModal(false);
  };

  return (
    <div className='px-3 pt-10'>
      <p className='text-2xl mb-8'>My Profile</p>
      {/* 프로필 카드 */}
      <div className='card bg-base-100 shadow-xl py-6'>
        <div>
          <div className='w-36 h-36 rounded-full bg-slate-600 flex justify-center m-auto'></div>
        </div>
        <div className='card-body'>
          <p className='text-sm'>Name</p>
          <h2 className='card-title'>{nickname}</h2>
          <p className='mt-4 text-base'>{user?.intro}</p>
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
      <div className='mt-10 card bg-base-100 shadow-xl py-6'>
        <div className='card-body'>
          <div>
            <p className='text-sm mb-2'>클럽 정보</p>
            {user?.club ? (
              <p> user.club.location</p>
            ) : (
              <button onClick={clickRegisterClub} className='btn btn-primary rounded-md px-2'>
                가입클럽 등록하기
              </button>
            )}
            {/* <p className='mt-3'>목감 클럽 (일반 회원)</p> */}
          </div>
          <div className='mt-10'>
            <p className='text-sm'>활동기간</p>
            <p className='mt-3'>2009~2022 (11년)</p>
          </div>
          <div className='mt-10'>
            <p className='text-sm'>급수</p>
            <p className='mt-3'>{user && user.level ? `${user.level}조` : '급수를 등록해주세요'}</p>
          </div>
        </div>
      </div>

      {/* 클럽 등록 모달 */}
      {showModal ? <label htmlFor='map-modal' ref={modalRef}></label> : null}
      {showModal ? <ClubListModal onCancelModal={onCancelModal} /> : null}
    </div>
  );
};
export default MyInfoPage;
