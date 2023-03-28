import { logout } from '@/lib/api/user';
import { updateAlertState } from '@/store/slices/AlertSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useAppDispatch } from 'src/store/hooks';
import { clearAuthState } from 'src/store/slices/authSlice';

const Navigation = () => {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['accessToken', 'userId']);

  useEffect(() => {
    setIsLoggedIn(() => {
      return cookies.userId ? true : false;
    });
  }, []);

  const onLogout = async () => {
    const res = await logout();

    if (res.resultCode === '0000') {
      dispatch(updateAlertState({ show: true, message: '로그아웃 했어요' }));
      dispatch(clearAuthState());
      router.replace('/login');
    }
  };

  const onMyInfo = () => {
    handleClick();
    router.push('/myInfo');
  };

  const handleClick = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <>
      <nav className='navbar fixed justify-between w-full z-40 h-20 bg-primary px-4 text-white'>
        <div className='page-title'>
          <Link href={'/'}>Home</Link>
        </div>
        <ul className='nav-list'>
          {loggedIn && (
            <li className='pr-4'>
              <Link href={'/post/new'}>New</Link>
            </li>
          )}

          <li className='pr-4'>
            <Link href={'/post/all'}>All</Link>
          </li>
          <li>
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='m-1 cursor-pointer'>
                {loggedIn ? (
                  <div className='indicator relative'>
                    <span>My</span>
                  </div>
                ) : (
                  <a
                    onClick={() => {
                      if (!loggedIn) {
                        router.push('/login');
                      }
                    }}
                  >
                    login
                  </a>
                )}
              </label>
              <ul
                tabIndex={0}
                className={`dropdown-content menu shadow bg-base-100 rounded-box w-36 text-black  ${
                  !loggedIn && 'hidden'
                }`}
              >
                <li className='text-sm' onClick={onMyInfo}>
                  <a>내정보</a>
                </li>
                <li className='text-sm' onClick={onLogout}>
                  <a>로그아웃</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
