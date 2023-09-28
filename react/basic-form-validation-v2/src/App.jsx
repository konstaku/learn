import { useRef, useState } from 'react';

function App() {
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <form
      className="form"
      onSubmit={(e) =>
        validateAndSubmit(e, [
          emailRef.current.value,
          passwordRef.current.value,
        ])
      }
    >
      <div className={emailErrorMessage ? 'form-group error' : 'form-group'}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          defaultValue="test@test.com"
          ref={emailRef}
        />
        <div className="msg" hidden={!emailErrorMessage}>
          Must end in @webdevsimplified.com
        </div>
      </div>
      <div className="form-group">
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          defaultValue="password123"
          ref={passwordRef}
          type="password"
          id="password"
        />
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );

  function validateAndSubmit(e, [email, password]) {
    e.preventDefault();

    if (!email.endsWith('@webdevsimplified.com')) {
      setEmailErrorMessage(() => 'Email should end in @webdevsimplified.com!');
      return;
    }

    setEmailErrorMessage(() => null);
  }
}

export default App;
