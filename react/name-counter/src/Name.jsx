import { useState } from 'react';

export function Name() {
  const [name, setName] = useState('');

  console.log('Render child');

  return (
    <div className="child">
      Hi, my name is {name}
      <br />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
