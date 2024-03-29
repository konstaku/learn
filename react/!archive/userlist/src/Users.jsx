import { useState, useEffect } from 'react';
import { UserCard } from './UserCard';

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const controller = new AbortController();

    fetch('https://jsonplaceholder.typicode.com/users', {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));

    return () => {
      controller.abort;
    };
  }, []);

  return (
    <>
      <h1>User list:</h1>
      {loading ? (
        'Loading...'
      ) : (
        <ul>
          {users.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </ul>
      )}
    </>
  );
}
