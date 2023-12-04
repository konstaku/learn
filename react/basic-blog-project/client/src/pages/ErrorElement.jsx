import { useRouteError } from 'react-router-dom';

export default function ErrorElement() {
  const environment = process.env.NODE_ENV;
  const error = useRouteError();

  console.log('error:', error);

  return (
    <div>
      Unexpected error occured!
      {environment === 'development' && (
        <>
          {' '}
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </div>
  );
}
