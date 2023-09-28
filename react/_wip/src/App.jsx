import { useRef, useState } from 'react';
import './style.css';

function App() {
  const nameRef = useRef();

  return (
    <>
      First name:
      <input className="input" type="text" ref={nameRef} />
      <br />
      <button
        className="btn"
        onClick={() => alert('Name:', nameRef.current.value)}
      >
        Show name
      </button>
    </>
  );
}

export default App;
