import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';

export const newPostRoute = {
  loader,
  action,
  element: <NewPost />,
};

function NewPost() {
  const users = useLoaderData();
  const errorMessages = useActionData();
  const { state } = useNavigation();
  const busy = state === 'loading' || state === 'submitting';

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form method="post" action="/posts/new" className="form">
        <div className="form-row">
          <div className={`form-group ${errorMessages?.title && 'error'}`}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            <div className="error-message" hidden={!errorMessages?.title}>
              {errorMessages?.title}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className={`form-group ${errorMessages?.body && 'error'}`}>
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"></textarea>
            <div className="error-message" hidden={!errorMessages?.body}>
              {errorMessages?.body}
            </div>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <a className="btn btn-outline" href="/posts">
            Cancel
          </a>
          <button disabled={busy} className="btn">
            {busy ? 'Sending...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  );
}

function loader({ request: { signal } }) {
  return fetch('http://localhost:3000/users', { signal });
}

async function action({ request, signal }) {
  const formData = await request.formData();

  const userId = formData.get('userId');
  const title = formData.get('title');
  const body = formData.get('body');

  const errors = { title: null, body: null };

  if (title === '') errors.title = 'Title is required!';
  if (body === '') errors.body = 'Body is required!';

  if (errors.title || errors.body) return errors;

  await fetch('http://localhost:3000/posts', {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, title, body }),
  });

  return redirect('/posts');
}
