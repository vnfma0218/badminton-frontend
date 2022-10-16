import useRefreshToken from '@/hooks/useRefreshToken';
import { logout } from '@/lib/api/user';
import { updateAlertState } from '@/store/slices/AlertSlice';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { authState, clearAuthState } from 'src/store/slices/authSlice';

const Navigation = () => {
  const refresh = useRefreshToken();
  const { userId, accessToken } = useAppSelector(authState);
  const dispatch = useAppDispatch();

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

  return (
    <nav className='navbar fixed justify-between w-full z-40 h-20 bg-primary'>
      <div className='page-title'>
        <Link href={'/'}>Home</Link>
      </div>
      <ul className='nav-list'>
        <li className='mr-5'>
          <Link href={'/post/new'}>New</Link>
        </li>
        <li className='mr-5'>
          <Link href={'/post/all'}>All</Link>
        </li>
        <li className='mr-5'>
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='m-1 cursor-pointer'>
              <Link href={userId ? '' : '/login/temp'}>{userId ? <a>My</a> : <a>login</a>}</Link>
            </label>
            <ul
              tabIndex={0}
              className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ${
                !userId && 'hidden'
              }`}
            >
              <li>
                <Link href={'/myInfo'}>MyInfo</Link>
              </li>
              <li onClick={onLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
          {/* <Link href={userId ? '' : '/login/temp'}>
            {userId ? <a onClick={onLogout}>Logout</a> : <a>login</a>}
          </Link> */}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
