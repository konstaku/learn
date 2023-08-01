import React from 'react';
import { Name } from './Name';

function App() {
  return (
    <div>
      <Name name="Emperor Konstantin" age={20} />
      <Name name="Random person" age={45} />
      <Name name="Unknown dude" />
    </div>
  );
}

export default App;
