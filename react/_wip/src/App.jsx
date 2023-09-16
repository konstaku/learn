import { useState } from 'react';
import './style.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Counter count={count} onClick={increaseCount} />
      <Counter count={count} onClick={increaseCount} />
      <Counter count={count} onClick={increaseCount} />
    </>
  );

  function increaseCount() {
    console.log('function called, count:', count);
    setCount((current) => current + 1);
  }
}

function Counter({ count, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

export default App;
