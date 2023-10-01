import { useRef } from 'react';
import { useController, useForm } from 'react-hook-form';
import Select from 'react-select';

function App() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'test@test.co.uk',
      password: 'password123',
    },
  });

  const { field: countryField } = useController({
    name: 'country',
    control,
    rules: { required: { value: true, message: 'Required' } },
  });

  const countryOptions = [
    {
      value: 'IT',
      label: '🇮🇹 Italy',
    },
    {
      value: 'UA',
      label: '🇺🇦 Ukraine',
    },
    {
      value: 'FR',
      label: '🇫🇷 France',
    },
  ];

  function onSubmit(data) {
    alert('TUTTO BENE!');
    console.log(data);
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div
        className={errors?.email?.message ? 'form-group error' : 'form-group'}
      >
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          {...register('email', {
            required: { value: true, message: 'Required' },
            validate: (value) =>
              value.endsWith('@gmail.com') ? null : 'Must end with @gmail.com',
          })}
        />
        <div className="msg" hidden={!errors?.email?.message}>
          {errors?.email?.message}
        </div>
      </div>
      <div
        className={
          errors?.password?.message ? 'form-group error' : 'form-group'
        }
      >
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          {...register('password', {
            required: { value: true, message: 'Required' },
            minLength: {
              value: 10,
              message: 'The password should be at least 10 characters long',
            },
            validate: {
              hasLowercase: (value) =>
                value.toUpperCase() === value
                  ? 'Must have at least one lowercase character'
                  : null,
              hasUppercase: (value) =>
                value.toLowerCase() === value
                  ? 'Must have at least one uppercase character'
                  : null,
              hasNumber: (value) =>
                !value.match(/[0-9]/) ? 'Must have at least one number' : null,
            },
          })}
        />
        <div className="msg" hidden={!errors?.password?.message}>
          {errors?.password?.message}
        </div>
      </div>
      <div className={`form-group ${errors?.password?.message ? 'error' : ''}`}>
        <Select options={countryOptions} {...countryField} />
        <div className="msg" hidden={!errors?.country?.message}>
          {errors?.country?.message}
        </div>
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
}

export default App;
