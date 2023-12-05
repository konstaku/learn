import { Link, useLoaderData } from 'react-router-dom';

export const postRoute = {
  loader,
  element: <Post />,
};

function Post() {
  const { post, author, comments } = useLoaderData();

  return (
    <>
      <h1 className="page-title">
        {post.title}
        <div className="title-btns">
          <Link className="btn btn-outline" to={`/posts/${post.id}/edit`}>
            Edit
          </Link>
        </div>
      </h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${author.id}`}>{author.name}</Link>
      </span>
      <div>{post.body}</div>
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
    </>
  );
}

async function loader({ params, request: { signal } }) {
  const post = await fetch(`http://localhost:3000/posts/${params.postId}`, {
    signal,
  }).then((res) => res.json());

  const author = fetch(`http://localhost:3000/users/${post.userId}`, {
    signal,
  }).then((res) => res.json());

  const comments = fetch(
    `http://localhost:3000/posts/${params.postId}/comments`,
    { signal }
  ).then((res) => res.json());

  return { post, author: await author, comments: await comments };
}
