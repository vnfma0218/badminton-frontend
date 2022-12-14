import useRefreshToken from '@/hooks/useRefreshToken';
import { getUserNotification, logout } from '@/lib/api/user';
import { updateAlertState } from '@/store/slices/AlertSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { authState, clearAuthState } from 'src/store/slices/authSlice';
import useSWR from 'swr';
import Modal from '../Modal/Modal';

const Navigation = () => {
  const router = useRouter();
  const refresh = useRefreshToken();
  const { userId, accessToken } = useAppSelector(authState);
  const dispatch = useAppDispatch();

  const [notiOpen, setNotiOpen] = useState<boolean>(false);

  const { data } = useSWR(accessToken ? '/noti/all' : null, () => getUserNotification(accessToken));

  useEffect(() => {
    const getAccessToken = async () => {
      await refresh();
    };
    if (!accessToken) {
      getAccessToken();
    }
  }, []);

  const onLogout = async () => {
    const res = await logout(accessToken);
    if (res.resultCode === '0000') {
      dispatch(updateAlertState({ show: true, message: '로그아웃 했어요' }));
      dispatch(clearAuthState());
    }
  };
  console.log(data?.dataList);

  const onNotiClick = () => {
    setNotiOpen(true);
  };
  return (
    <>
      <nav className='navbar fixed justify-between w-full z-40 h-20 bg-primary px-14'>
        <div className='page-title'>
          <Link href={'/'}>Home</Link>
        </div>
        <ul className='nav-list'>
          {userId && (
            <li className='mr-5'>
              <Link href={'/post/new'}>New</Link>
            </li>
          )}

          <li className='mr-5'>
            <Link href={'/post/all'}>All</Link>
          </li>
          <li className='mr-5'>
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='m-1 cursor-pointer'>
                {userId ? (
                  <div className='indicator relative'>
                    {data && data?.dataList.notiList.length > 0 && (
                      <span className='indicator-item badge indicator-top indicator-end badge-secondary absolute -right-2'>
                        {data?.dataList.notiList.length}
                      </span>
                    )}
                    <span>My</span>
                  </div>
                ) : (
                  <a
                    onClick={() => {
                      if (!userId) {
                        router.push('/login/temp');
                      }
                    }}
                  >
                    login
                  </a>
                )}
              </label>
              <ul
                tabIndex={0}
                className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ${
                  !userId && 'hidden'
                }`}
              >
                <li>
                  <Link href={'/myInfo'}>내정보</Link>
                </li>
                <li onClick={onLogout}>
                  <a>로그아웃</a>
                </li>
                <li onClick={onNotiClick}>
                  <a>알림</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
      {notiOpen && (
        <Modal>
          <div>
            <button
              className='btn btn-sm btn-circle absolute right-2 top-2'
              onClick={() => {
                setNotiOpen(false);
              }}
            >
              X
            </button>
            <ul className='mt-7 max-h-64 overflow-y-scroll w-full'>
              {data && data?.dataList.notiList.length < 0 ? (
                data?.dataList.notiList.map((noti) => <li className='mb-8'>{noti.content}</li>)
              ) : (
                <span>알람 내역이 없어요</span>
              )}
            </ul>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Navigation;
