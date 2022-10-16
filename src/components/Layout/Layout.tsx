import { useAppSelector } from '@/store/hooks';
import { alertState } from '@/store/slices/AlertSlice';
import React from 'react';
import ToastModal from '../Modal/ToastModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { show } = useAppSelector(alertState);

  return (
    <div data-theme='pastel' className='h-screen'>
      {children}
      {show && <ToastModal />}

      {/* <ToastModal /> */}
    </div>
  );
};

export default Layout;
