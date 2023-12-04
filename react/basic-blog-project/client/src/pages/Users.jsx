import { Link, useLoaderData, useNavigation } from 'react-router-dom';

export default function Users() {
  const users = useLoaderData();
  const { state } = useNavigation();

  return (
    <div className={`container${state === 'loading' ? ' loading' : ''}`}>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {users.map((user) => {
          return (
            <div key={user.id} className="card">
              <div className="card-header">{user.name}</div>
              <div className="card-body">
                <div>{user.company.name}</div>
                <div>{user.website}</div>
                <div>{user.email}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={`${user.id}`}>
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
