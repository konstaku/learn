import { useState } from 'react';
import { DisplayString } from './DisplayString.jsx';

export function NameAge({ favouriteNumber }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(38);

  return (
    <div>
      <DisplayString name={name} age={age} />
      {favouriteNumber != null && (
        <h2>My favourite number is {favouriteNumber}</h2>
      )}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <span onClick={changeAge}>
        <input type="button" value="-" />
        {age}
        <input type="button" value="+" />
      </span>
    </div>
  );

  function changeAge(event) {
    switch (event.target.value) {
      case '+':
        setAge((currentAge) => currentAge + 1);
        break;
      case '-':
        setAge((currentAge) => currentAge - 1);
        break;
    }
  }
}
