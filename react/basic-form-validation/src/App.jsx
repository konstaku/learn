import { useRef, useState } from 'react';
import './styles.css';

function App() {
  const nameRef = useRef();
  const passwordRef = useRef();

  const [passwordFormClass, setPasswordFormClass] = useState('form-group');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [emailFormClass, setEmailFormClass] = useState('form-group');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className={emailFormClass}>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            className="input"
            type="email"
            id="email"
            ref={nameRef}
            required
          />
          <div className="msg">{emailErrorMessage}</div>
        </div>
        <div className={passwordFormClass}>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            className="input"
            type="password"
            ref={passwordRef}
            required
          />
          <div className="msg">{passwordErrorMessage}</div>
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const nameValue = nameRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (!/@webdevsimplified\.com$/.test(nameValue)) {
      showEmailError('Must end in @webdevsimplified.com');
    } else if (passwordValue.length < 10) {
      showPasswordError('The password should be minimum 10 characters long');
    } else if (!/[a-z]/.test(passwordValue)) {
      showPasswordError(
        'The password should have at least one lowercase letter'
      );
    } else if (!/[A-Z]/.test(passwordValue)) {
      showPasswordError(
        'The password should have at least one uppercase letter'
      );
    } else if (!/[0-9]/.test(passwordValue)) {
      showPasswordError('The password should include a number');
    } else {
      setEmailFormClass('form-group');
      setPasswordFormClass('form-group');
      alert('Success!');
    }
  }

  function showPasswordError(message) {
    setPasswordFormClass('form-group error');
    setPasswordErrorMessage(message);
  }

  function showEmailError(message) {
    setEmailFormClass('form-group error');
    setEmailErrorMessage(message);
  }
}

export default App;
