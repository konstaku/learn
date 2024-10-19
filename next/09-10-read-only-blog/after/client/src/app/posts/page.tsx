import { PostCard } from '../components/PostCard';
import { Post } from '../types/types';

async function getPosts() {
  return fetch('http://localhost:3001/posts').then(response => response.json());
}

export default async function Posts() {
  const posts: Post[] = await getPosts();

  return (
    <>
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}
