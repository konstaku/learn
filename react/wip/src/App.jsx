import { useRef } from 'react';

function App() {
  const nameRef = useRef();
  
  return (
    <>
      <form onSubmit={submitForm}>
        <label htmlFor="name-form">Name:</label>
        <br />
        <input type="text" id="name-form" ref={nameRef} />
        <br />
        <button>Alert name</button>
      </form>
    </>
  );

  function submitForm(event) {
    event.preventDefault();
    const name = nameRef.current.value;
    if (name === '') return;
    alert(name);
  }
}

export default App;
