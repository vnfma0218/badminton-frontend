import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { AuthProvider } from 'src/components/contexts/AuthContext';
import { Provider } from 'react-redux';
import { store } from 'src/store';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log('home 실행');
  }, []);
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
