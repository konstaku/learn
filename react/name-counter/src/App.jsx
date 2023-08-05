// import { Name } from './Name.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handler = () => console.log(name);
    document.addEventListener('click', handler);
    console.log('inside use effect');

    return () => {
      console.log('cleanup');
      document.removeEventListener('click', handler);
    };
  }, [name]);

  return (
    <div>
      <h1>
        Hello, I am {name} and i'm {age} years old
      </h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(() => e.target.value)}
      />
      <br />
      <br />
      <button onClick={() => setAge((age) => age - 1)}>-</button>
      {age}
      <button onClick={() => setAge((age) => age + 1)}>+</button>
    </div>
  );
}

export default App;
