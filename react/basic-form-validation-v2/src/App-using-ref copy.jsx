import { useEffect, useRef, useState } from 'react';

function App() {
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();

  useValidateWhileTyping({
    ref: emailRef,
    error: emailErrorMessage,
    validator: validateEmail,
  });
  useValidateWhileTyping({
    ref: passwordRef,
    error: passwordErrorMessage,
    validator: validatePassword,
  });

  return (
    <form
      className="form"
      onSubmit={(e) =>
        validateBeforeSubmit(e, [
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
          {emailErrorMessage}
        </div>
      </div>
      <div className={passwordErrorMessage ? 'form-group error' : 'form-group'}>
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
        <div className="msg" hidden={!passwordErrorMessage}>
          {passwordErrorMessage}
        </div>
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );

  function validateBeforeSubmit(e, [email, password]) {
    e.preventDefault();

    const emailOk = validateEmail(email);
    const passwordOk = validatePassword(password);

    if (emailOk && passwordOk) {
      alert('TUTTO BENE!');
    }
  }

  function validateEmail(currentEmail) {
    if (!currentEmail) {
      setEmailErrorMessage(() => 'Please enter your email');
    } else if (!currentEmail.endsWith('@webdevsimplified.com')) {
      setEmailErrorMessage(() => 'Email should end in @webdevsimplified.com!');
    } else {
      setEmailErrorMessage(() => null);
      return true;
    }

    return false;
  }

  function validatePassword(currentPassword) {
    if (!currentPassword) {
      setPasswordErrorMessage(() => 'Password required (Cannot be blank)');
    } else if (currentPassword.length < 10) {
      setPasswordErrorMessage(() => 'Password must Be 10 characters or longer');
    } else if (currentPassword.toUpperCase() === currentPassword) {
      setPasswordErrorMessage(() => 'Password must include a lowercase letter');
    } else if (currentPassword.toLowerCase() === currentPassword) {
      setPasswordErrorMessage(
        () => 'Password must include an uppercase letter'
      );
    } else if (!currentPassword.match(/\d/)) {
      setPasswordErrorMessage(() => 'Password must include a number');
    } else {
      setPasswordErrorMessage(() => null);
      return true;
    }

    return false;
  }
}

function useValidateWhileTyping({ ref, error, validator }) {
  useEffect(() => {
    const validationField = ref.current;

    if (error) {
      validationField.addEventListener('keyup', (e) =>
        validator(validationField.value)
      );
    }

    return () => {
      validationField.removeEventListener('keyup', (e) =>
        validator(validationField.value)
      );
    };
  }, [error]);
}

export default App;
