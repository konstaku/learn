import { useEffect, useState } from 'react';

export function useFetch(url, options) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    setData(undefined);
    setIsLoading(true);
    setIsError(null);

    const controller = new AbortController();

    fetch(url, { ...options, signal: controller.signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(setData)
      .catch((e) => {
        if (e.name === 'AbortError') {
          return;
        }
        setIsError(e);
      })
      .finally(() => {
        if (controller.signal.aborted) {
          return;
        }
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, isError };
}
