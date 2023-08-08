import { useMemo, useState } from 'react';

const LIST = Array(1_000_000)
  .fill()
  .map((_, i) => i + 1);

export function DarkMillion() {
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const filteredList = useMemo(() => {
    return LIST.filter((el) => el.toString().includes(input));
  }, [input]);

  console.log(filteredList.length);

  return (
    <div
      style={{
        background: darkMode ? '#333' : 'white',
        color: darkMode ? 'white' : '#333',
        padding: '50px',
      }}
    >
      <h2>Query:</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <br />
      <br />{' '}
      <label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        />
        Dark mode
      </label>
    </div>
  );
}
