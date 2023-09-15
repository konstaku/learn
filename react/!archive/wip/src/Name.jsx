import { useState } from 'react';

export function Name() {
  const [name, setName] = useState('Konsta');
  const [age, setAge] = useState(38);

  return (
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
  );
}
