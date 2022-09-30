import Link from 'next/link';
import useAuth from 'src/hooks/useAuth';

const Navigation = () => {
  const { accessToken } = useAuth();
  return (
    <nav className="navbar">
      <div className="page-title">Home</div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link href={accessToken ? '' : '/login'}>
            {accessToken ? 'Logout' : 'login'}
          </Link>
        </li>
        <li className="nav-item">
          <Link href={'/post/new'}>Post</Link>
        </li>
        <li className="nav-item">
          <Link href={'/post/all'}>All</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
