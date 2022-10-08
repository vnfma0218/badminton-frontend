import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { AuthProvider } from 'src/contexts/AuthContext'
import { Provider } from 'react-redux'
import { store } from '@/store'
import Navigation from '@/components/Layout/Navigation'
import Layout from '@/components/Layout/Layout'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log('home 실행')
  }, [])
  return (
    <Provider store={store}>
      <AuthProvider>
        <Layout>
          <Navigation />
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </Provider>
  )
}

export default MyApp