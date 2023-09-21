import { useState } from 'react';
import './style.css';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(10);

  return (
    <div className="wrapper">
      <h2 style={{ textAlign: 'center', maxWidth: '60%', lineHeight: '1.5em' }}>
        Hello, my name is {name} and I am {age} years old
      </h2>

      <input
        className="input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          className="btn"
          onClick={() => setAge((currentAge) => currentAge - 1)}
        >
          -
        </button>
        {age}
        <button
          className="btn"
          onClick={() => setAge((currentAge) => currentAge + 1)}
        >
          +
        </button>
        <br />
        <br />
      </div>
    </div>
  );
}

export default App;
