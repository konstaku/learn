import { useCallback, useState } from 'react';

export function useArray(initialArray) {
  const [array, setArray] = useState(initialArray);

  const push = useCallback(
    (number) => setArray((currentArray) => [...currentArray, number]),
    []
  );

  const replace = useCallback(
    (indexToReplace, newValue) =>
      setArray((currentArray) =>
        currentArray.map((value, index) =>
          index === indexToReplace ? newValue : value
        )
      ),
    []
  );

  const filter = useCallback(
    (handler) => setArray((currentArray) => currentArray.filter(handler)),
    []
  );

  const remove = useCallback(
    (indexToRemove) =>
      setArray((currentArray) =>
        currentArray.filter((_, index) => index !== indexToRemove)
      ),
    []
  );

  const clear = useCallback(() => setArray([]), []);

  const reset = useCallback(() => setArray(initialArray), [initialArray]);

  return { array, set: setArray, push, replace, filter, remove, clear, reset };
}
