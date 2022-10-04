import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { AuthProvider } from 'src/contexts/AuthContext'
import { Provider } from 'react-redux'
import { store } from 'src/store'
import '../../styles/globals.css'
import '../../styles/reset.css'
import Navigation from 'src/components/Layout/Navigation'
import Layout from 'src/components/Layout/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log('home 실행')
  }, [])
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navigation />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
