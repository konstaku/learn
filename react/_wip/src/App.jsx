import { useReducer } from 'react';
import './style.css';

function countReducer(count, action) {
  switch (action.type) {
    case 'DECREMENT':
      return count - 1;
    case 'INCREMENT':
      return count + 1;
    case 'RESET':
      return 0;
    default:
      return count;
  }
}

function App() {
  const [count, dispatch] = useReducer(countReducer, 0);

  return (
    <>
      <button className="btn" onClick={() => dispatch({ type: 'DECREMENT' })}>
        -
      </button>
      {count}
      <button className="btn" onClick={() => dispatch({ type: 'INCREMENT' })}>
        +
      </button>
      <br />
      <button className="btn" onClick={() => dispatch({ type: 'RESET' })}>
        Reset
      </button>
    </>
  );
}

export default App;
