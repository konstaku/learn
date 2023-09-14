import { useState } from 'react';

export function FormValidationState() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDivClass, setEmailDivClass] = useState('form-group');
  const [passwordDivClass, setPasswordDivClass] = useState('form-group');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [emailAfterError, setEmailAfterError] = useState(false);

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className={emailDivClass}>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <div className="msg">{emailErrorMessage}</div>
        </div>
        <div className={passwordDivClass}>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

    if (!emailIsCorrect(email)) {
      setEmailDivClass('form-group error');
      setEmailErrorMessage('Must end in @webdevsimplified.com');
      setEmailAfterError(true);
    }
  }

  function handleEmailChange(event) {
    if (emailAfterError) {
      if (emailIsCorrect(event.target.value)) {
        console.log('email is correct');
        setEmailDivClass('form-group');
        setEmailErrorMessage('');
      } else {
        console.log('email is not correct');
        setEmailDivClass('form-group error');
        setEmailErrorMessage('Must end in @webdevsimplified.com');
      }
    }

    setEmail(event.target.value);
  }

  function emailIsCorrect(data) {
    return /@webdevsimplified\.com$/.test(data);
  }
}
