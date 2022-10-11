import { logout } from '@/lib/api/user'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { authState, clearAuthState } from 'src/store/slices/authSlice'

const Navigation = () => {
  const { userId, accessToken } = useAppSelector(authState)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [curRoute, setCurRoute] = useState()

  useEffect(() => {
    if (router.pathname) {
      // console.log(router.pathname.split('/'))
    }
  }, [])

  const onLogout = async () => {
    const res = await logout(accessToken)
    if (res.status === 200) {
      dispatch(clearAuthState())
    }
  }

  return (
    <nav className='navbar fixed justify-between w-full z-40 h-20 bg-primary'>
      <div className='page-title'>
        <Link href={'/'}>Home</Link>
      </div>
      <ul className='nav-list'>
        <li className='mr-5'>
          <Link href={userId ? '' : '/login/temp'}>
            {userId ? <a onClick={onLogout}>Logout</a> : <a>login</a>}
          </Link>
        </li>
        <li className='mr-5'>
          <Link href={'/post/new'}>Post</Link>
        </li>
        <li className='mr-5'>
          <Link href={'/post/all'}>All</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
