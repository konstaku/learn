import { Link, useLoaderData } from 'react-router-dom';

export const userRoute = {
  loader,
  element: <User />,
};

function User() {
  const { user, userPosts, userTodos } = useLoaderData();

  return (
    <>
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b>
        {` ${user.address.street} ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {userPosts.map((post) => (
          <div key={post.id} className="card">
            <div className="card-header">{post.title}</div>
            <div className="card-body">
              <div className="card-preview-text">{post.body}</div>
            </div>
            <div className="card-footer">
              <Link className="btn" to={`/posts/${post.id}`}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {userTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'strike-through' : ''}>
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
}

async function loader({ params, request: { signal } }) {
  const user = fetch(`http://localhost:3000/users/${params.userId}`, {
    signal,
  }).then((res) => res.json());

  const userPosts = fetch(
    `http://localhost:3000/posts?userId=${params.userId}`,
    { signal }
  ).then((res) => res.json());

  const userTodos = fetch(
    `http://localhost:3000/todos?userId=${params.userId}`,
    { signal }
  ).then((res) => res.json());

  return {
    user: await user,
    userPosts: await userPosts,
    userTodos: await userTodos,
  };
}
