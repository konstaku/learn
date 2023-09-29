import { useEffect, useRef, useState } from 'react';

function App() {
  const [emailValue, setEmailValue] = useState('test@test.com');
  const [passwordValue, setPasswordValue] = useState('password123');
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [submittedWithError, setSubmittedWithError] = useState(false);

  return (
    <form
      className="form"
      onSubmit={(e) => validateBeforeSubmit(e, [emailValue, passwordValue])}
    >
      <div className={emailErrorMessage ? 'form-group error' : 'form-group'}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          value={emailValue}
          onChange={(e) =>
            validateWhileTyping({
              value: e.target.value,
              setter: setEmailValue,
              validator: validateEmail,
              isError: submittedWithError,
            })
          }
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
          value={passwordValue}
          onChange={(e) =>
            validateWhileTyping({
              value: e.target.value,
              setter: setPasswordValue,
              validator: validatePassword,
              isError: submittedWithError,
            })
          }
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
      return alert('TUTTO BENE!');
    }

    setSubmittedWithError(true);
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

  function validateWhileTyping({ value, setter, validator, isError }) {
    const currentValue = value;
    setter(currentValue);
    if (isError) {
      validator(currentValue);
    }
  }
}

export default App;
