import { useEffect, useState } from 'react';

export function useLocalStorage(STORAGE_KEY, initialValue) {
  const [value, setValue] = useState(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData === null) {
      console.log(storedData);
      if (typeof initialValue === 'function') {
        return initialValue();
      }
      return initialValue;
    } else {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }
  });

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    }
  }, [value, STORAGE_KEY]);

  return [value, setValue];
}
