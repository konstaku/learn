import { Link, useLoaderData } from 'react-router-dom';

export const postsRoute = {
  loader,
  element: <Posts />,
};

function Posts() {
  const posts = useLoaderData();

  return (
    <>
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <div className="card-header">{post.title}</div>
            <div className="card-body">
              <div className="card-preview-text">{post.body}</div>
            </div>
            <div className="card-footer">
              <Link className="btn" to={`${post.id}`}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function loader({ request: { signal } }) {
  return fetch('http://localhost:3000/posts', { signal });
}
