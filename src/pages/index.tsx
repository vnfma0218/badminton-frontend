import type { NextPage } from 'next'
import { useContext } from 'react'
import AuthContext from 'src/contexts/AuthContext'

const Home: NextPage = () => {
  const { accessToken } = useContext(AuthContext)
  console.log(accessToken)

  return <h1 className='text-3xl font-bold font-Noto underline'>테스트!</h1>
}

export default Home