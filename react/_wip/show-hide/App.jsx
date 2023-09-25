import { useEffect, useState } from 'react';
import './style.css';

function App() {
  const [isVisible, setIsVisible] = useState(true);

  const componentToShow = isVisible ? <MyComponent /> : null;

  return (
    <div className="wrapper">
      <button className="btn" onClick={() => setIsVisible(!isVisible)}>
        Show / Hide
      </button>
      {componentToShow}
    </div>
  );
}

function MyComponent() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(10);

  useEffect(() => console.log('*** Render ***'));

  useEffect(() => {
    console.log('*** Hi ***');
    return () => {
      console.log('*** Bye ***');
    };
  }, []);

  // useEffect(
  //   () => console.log(`*** My name is ${name} and I am ${age} years old ***`),
  //   [name, age]
  // );

  useEffect(() => {
    document.title = name;
  }, [name]);

  useEffect(() => {
    if (!name) return;

    const timeout = setTimeout(() => {
      console.log(`*** My name is ${name}`);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [name]);

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
