import Link from 'next/link'
import useAuth from 'src/hooks/useAuth'
import { useAppSelector } from 'src/store/hooks'
import { authState } from 'src/store/slices/authSlice'

const Navigation = () => {
  const { userId } = useAppSelector(authState)
  return (
    <nav className='navbar'>
      <div className='page-title'>Home</div>
      <ul className='nav-list'>
        <li className='nav-item'>
          <Link href={userId ? '' : '/login'}>{userId ? 'Logout' : 'login'}</Link>
        </li>
        <li className='nav-item'>
          <Link href={'/post/new'}>Post</Link>
        </li>
        <li className='nav-item'>
          <Link href={'/post/all'}>All</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
