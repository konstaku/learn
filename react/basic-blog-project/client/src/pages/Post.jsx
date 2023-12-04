import { Link, useLoaderData, useNavigation } from 'react-router-dom';

export default function Post() {
  const { post, author, comments } = useLoaderData();
  const { state } = useNavigation();

  return (
    <div className={`container${state === 'loading' ? ' loading' : ''}`}>
      <h1 className="page-title">{post?.title}</h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${author.id}`}>{author?.name}</Link>
      </span>
      <div>{post?.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map((comment) => (
          <div key={comment.id} className="card">
            <div className="card-body">
              <div className="text-sm mb-1">{comment.email}</div>
              {comment.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
