import { useState } from 'react';
import './style.css';

function App() {
  const nameProps = useInputValue('Konsta');
  const surnameProps = useInputValue('Ku');

  return (
    <>
      First name:
      <input className="input" type="text" {...nameProps} />
      <br />
      Second name:
      <input className="input" type="text" {...surnameProps} />
    </>
  );
}

function useInputValue(initialValue) {
  const [value, setValue] = useState(initialValue);

  return { value, onChange: (e) => setValue(() => e.target.value) };
}

export default App;
