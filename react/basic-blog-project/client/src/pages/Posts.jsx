import { Form, Link, useLoaderData } from 'react-router-dom';

export const postsRoute = {
  loader,

  element: <Posts />,
};

function Posts() {
  const { users, posts, searchParams } = useLoaderData();

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="new">
            New
          </Link>
        </div>
      </h1>
      <Form className="form mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input
              type="search"
              name="query"
              id="query"
              defaultValue={searchParams.query}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select type="search" name="userId" id="userId">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn">Filter</button>
        </div>
      </Form>
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

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get('query');
  const userId = searchParams.get('userId');

  const users = fetch('http://localhost:3000/users', { signal }).then((res) =>
    res.json()
  );

  const fetchURL = `http://localhost:3000/posts?q=${
    query === null ? '' : query
  }${userId === null ? '' : '&userId=' + userId}`;

  const posts = await fetch(fetchURL, {
    signal,
  }).then((res) => res.json());

  return {
    users: await users,
    posts: posts,
    searchParams: { query, userId },
  };
}
