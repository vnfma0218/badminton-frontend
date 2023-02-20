import type { AppProps } from 'next/app';
import { AuthProvider } from 'src/contexts/AuthContext';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Navigation from '@/components/Layout/Navigation';
import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css';
import '@/styles/Pagination.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Layout>
          <Navigation />
          <main className='pt-20 h-screen max-w-5xl m-auto'>
            <Component {...pageProps} />
          </main>
        </Layout>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
