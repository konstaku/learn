import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <ul className="nav">
      <li>
        <Link to={'/'}>Home</Link>
      </li>
      <li>
        <Link to={'/shop'}>Shop</Link>
      </li>
      <li>
        <Link to={'/contact'}>Contact</Link>
      </li>
      <li>
        <Link to={'/team'}>Team</Link>
      </li>
    </ul>
  );
}
