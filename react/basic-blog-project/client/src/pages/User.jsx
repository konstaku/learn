import { Link, useLoaderData, useNavigation } from 'react-router-dom';

export default function User() {
  const { user, userPosts, userTodos } = useLoaderData();
  const { state } = useNavigation();

  return (
    <div className={`container${state === 'loading' ? ' loading' : ''}`}>
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
      </>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {userTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'strike-through' : ''}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
