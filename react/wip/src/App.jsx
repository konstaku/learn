import { useCallback, useEffect, useRef, useState } from 'react';
import { useToggle } from './useToggle';
import { useInputValue } from './useInputValue';

function App() {
  const nameInput = useInputValue('');
  const [darkMode, toggleDarkMode] = useToggle(false);

  return (
    <div
      style={{
        backgroundColor: darkMode ? '#333' : '#fff',
        color: darkMode ? '#fff' : '#333',
        width: '100%',
        padding: '30px',
      }}
    >
      name:
      <input type="text" {...nameInput} />
      <br />
      <br />
      <button onClick={toggleDarkMode}>Set dark</button>
    </div>
  );
}

export default App;
