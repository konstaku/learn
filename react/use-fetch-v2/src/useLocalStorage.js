import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(getInitialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];

  function getInitialValue() {
    const storedValue = JSON.parse(localStorage.getItem(key));

    return storedValue !== null
      ? storedValue
      : typeof initialValue === 'function'
      ? initialValue()
      : initialValue;
  }
}
