import { Link, Outlet, useNavigation } from 'react-router-dom';

export default function NavBar() {
  const { state } = useNavigation();

  return (
    <>
      <nav className="top-nav">
        <div className="nav-text-large">My App</div>
        <ul className="nav-list">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
        </ul>
      </nav>
      {state === 'loading' && <div className="loading-spinner" />}
      <Outlet />
    </>
  );
}
