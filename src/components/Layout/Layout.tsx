import { protectRoutes } from '@/lib/Constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { alertState } from '@/store/slices/AlertSlice';
import { authState, updateAuthState } from '@/store/slices/authSlice';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ToastModal from '../Modal/ToastModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { show } = useAppSelector(alertState);
  const { accessToken } = useAppSelector(authState);
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  useEffect(() => {
    if (!accessToken) {
      dispatch(updateAuthState({ accessToken: cookies.accessToken }));
    }
    if (!cookies.accessToken) {
      if (protectRoutes.includes(router.asPath)) {
        router.replace('/login');
      }
    }
  }, []);

  return (
    <div data-theme='pastel' className='h-screen'>
      {children}
      {show && <ToastModal />}
    </div>
  );
};

export default Layout;
