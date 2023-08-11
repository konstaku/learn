import { useCallback, useEffect, useMemo, useState } from 'react';

export function useLocalStorage(STORAGE_KEY, initialValue) {
  const [valueToStore, setValueToStore] = useState(initialValue);
  const [storedData, setStoredData] = useState(
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialValue
  );

  useEffect(() => {
    // useEffect for initial setup on the first render
    // I need to check if there is something in a local storage
    // If yes, i need to reset value fields
    // If not, set valueToStore
    setValueToStore(undefined);
    setStoredData(undefined);

    if (localStorage.getItem(STORAGE_KEY)) {
      setStoredData(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    } else {
      setValueToStore(initialValue);
      console.log(`Value to store: ${valueToStore}`);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(valueToStore));
      setStoredData(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    }
  }, []);

  const saveValue = useCallback((newValue) => {
    setValueToStore(newValue);

    console.log(`
    In saveValue function:
    newValue = ${newValue}
    ValueToStore = ${valueToStore}`);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(valueToStore));
    setStoredData(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  }, []);

  return [storedData, saveValue];
}
