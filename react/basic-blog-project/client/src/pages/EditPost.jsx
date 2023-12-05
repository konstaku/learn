import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';

export const editpostRoute = {
  loader,
  action,
  element: <EditPost />,
};

function EditPost() {
  const { post, users } = useLoaderData();
  const errorMessages = useActionData();
  const { state } = useNavigation();

  const busy = state === 'loading' || state === 'submitting';

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <Form method="post" action={`/posts/${post.id}/edit`} className="form">
        <div className="form-row">
          <div className={`form-group ${errorMessages?.title && 'error'}`}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={post.title}
            />
            <div className="error-message" hidden={!errorMessages?.title}>
              {errorMessages?.title}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId" defaultValue={post.userId}>
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
            <textarea name="body" id="body" defaultValue={post.body} />
            <div className="error-message" hidden={!errorMessages?.body}>
              {errorMessages?.body}
            </div>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="..">
            Cancel
          </Link>
          <button disabled={busy} className="btn">
            {busy ? 'Sending...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  );
}

async function loader({ params, request: { signal } }) {
  const post = fetch(`http://localhost:3000/posts/${params.postId}`, {
    signal,
  }).then((res) => res.json());

  const users = fetch('http://localhost:3000/users', { signal }).then((res) =>
    res.json()
  );

  return { post: await post, users: await users };
}

async function action({ params, request, signal }) {
  const formData = await request.formData();

  const userId = Number(formData.get('userId'));
  const title = formData.get('title');
  const body = formData.get('body');

  const errors = { title: null, body: null };

  if (title === '') errors.title = 'Title is required!';
  if (body === '') errors.body = 'Body is required!';

  if (errors.title || errors.body) return errors;

  await fetch(`http://localhost:3000/posts/${params.postId}`, {
    method: 'PUT',
    signal,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, title, body }),
  });

  return redirect('/posts');
}
