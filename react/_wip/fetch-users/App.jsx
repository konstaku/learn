import { useEffect, useState } from 'react';
import './style.css';

// https://jsonplaceholder.typicode.com/users

function App() {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://jsonplaceholder.typicode.com/users', {
      signal: controller.signal,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then((data) => setUsers(data))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));

    return () => {
      controller.abort;
    };
  }, []);

  let content;

  if (isLoading) {
    content = <h2>Loading...</h2>;
  } else if (error) {
    content = <h2>Error loading!</h2>;
  } else {
    content = users
      .filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
      .map((user) => <UserCard key={user.id} user={user} />);
  }

  return (
    <div className="wrapper">
      <SearchField query={query} setQuery={setQuery} />
      {content}
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div>
      <b>name:</b> {user.name}
    </div>
  );
}

function SearchField({ query, setQuery }) {
  return (
    <input
      className="input"
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default App;
