import { useState } from 'react';
import { ChildClass } from './ChildClass';
import { Child } from './Child';

export default function App() {
  const [show, setShow] = useState(true);

  const childComponent = show ? <Child /> : null;

  return (
    <div>
      <button onClick={() => setShow((currentShow) => !currentShow)}>
        Show/Hide
      </button>
      <br />
      <br />
      {childComponent}
    </div>
  );
}
