import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../components/contexts/AuthContext';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log('home 실행');
  }, []);
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
