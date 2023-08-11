import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function useLocalStorage(STORAGE_KEY, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    console.log('in use effect');
    if (!localStorage.getItem(STORAGE_KEY)) {
      updateValue(JSON.stringify(value));
    }
    setValue(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }, [value]);

  const updateValue = useCallback((newValue) => {
    setValue(newValue);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  });

  return [value, updateValue];
}
