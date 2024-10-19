import Link from 'next/link';
import type { User } from '../types/types';

function getUsers() {
  return fetch('http://localhost:3001/users').then(response => response.json());
}

export default async function Users() {
  const users: User[] = await getUsers();

  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {users.map(user => (
          <div key={user.id} className="card">
            <div className="card-header">{user.name}</div>
            <div className="card-body">
              <div>{user.company.name}</div>
              <div>{user.website}</div>
              <div>{user.email}</div>
            </div>
            <div className="card-footer">
              <Link className="btn" href={`users/${user.id.toString()}`}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
