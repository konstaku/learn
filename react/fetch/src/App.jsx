import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(undefined);

    const controller = new AbortController();

    fetch('https://jsonplaceholder.typicode.com/users', {
      signal: controller.signal,
    })
      .then((response) => {
        console.log('then...');
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(response.status);
        }
      })
      .then((result) => setData(result))
      .catch((e) => {
        if (e?.name === 'AbortError') {
          return;
        }
        setError(e);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, []);

  let jsx;

  if (loading) {
    jsx = <h2>Loading...</h2>;
  } else if (error != null) {
    jsx = <h2>Error!</h2>;
  } else {
    jsx = JSON.stringify(data);
  }

  return (
    <div>
      <h1>Data:</h1>
      {jsx}
    </div>
  );
}

export default App;
