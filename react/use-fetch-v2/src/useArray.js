import { useState } from 'react';

export function useArray(initialArray) {
  const [array, setArray] = useState(() =>
    typeof initialArray === 'function' ? initialArray() : initialArray
  );

  const push = (number) =>
    setArray((currentArray) => [...currentArray, number]);

  const replace = (index, newElement) =>
    setArray((currentArray) =>
      currentArray.map((element, currentIndex) =>
        currentIndex === index ? newElement : element
      )
    );

  const filter = (handleFilter) =>
    setArray((currentArray) => currentArray.filter(handleFilter));

  const remove = (index) =>
    setArray((currentArray) =>
      currentArray.filter((_, currentIndex) => currentIndex !== index)
    );

  const clear = () => setArray([]);

  const reset = () => setArray(initialArray);

  return { array, set: setArray, push, replace, filter, remove, clear, reset };
}
