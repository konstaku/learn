import { useState } from 'react';

export function NameAge() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(38);

  return (
    <div>
      <h1>
        Hi, my name is {name} and I am {age} years old
      </h1>
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
