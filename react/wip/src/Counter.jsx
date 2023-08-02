import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 onClick={increment}>Counter: {count}</h1>
    </div>
  );

  function increment() {
    setCount((currentCount) => currentCount + 1);
  }
}
