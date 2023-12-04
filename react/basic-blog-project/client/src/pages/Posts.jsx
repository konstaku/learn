import { Link, useLoaderData, useNavigation } from 'react-router-dom';

export default function Posts() {
  const posts = useLoaderData();
  const { state } = useNavigation();

  return (
    <div className={`container${state === 'loading' ? ' loading' : ''}`}>
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
    </div>
  );
}
