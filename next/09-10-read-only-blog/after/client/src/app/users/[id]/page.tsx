import { PostCard } from '@/app/components/PostCard';
import { TodoItem } from '@/app/components/TodoItem';
import type { Post, Todo, User } from '@/app/types/types';

function getUser(id: string) {
  return fetch(`http://localhost:3001/users/${id}`).then(response =>
    response.json()
  );
}

function getPostsForUser(userId: string) {
  return fetch(`http://localhost:3001/posts?userId=${userId}`).then(response =>
    response.json()
  );
}

function getTodosForUser(userId: string) {
  return fetch(`http://localhost:3001/todos?userId=${userId}`).then(response =>
    response.json()
  );
}

export default async function User({ params }: { params: { id: string } }) {
  const user: User = await getUser(params.id);
  const posts: Post[] = await getPostsForUser(user.id.toString());
  const todos: Todo[] = await getTodosForUser(user.id.toString());

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
        <b>Address:</b>{' '}
        {`${user.address.street} ${user.address.suite}
        ${user.address.city} ${user.address.zipcode}`}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
}
