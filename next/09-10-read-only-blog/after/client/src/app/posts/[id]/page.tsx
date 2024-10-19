import type { Comment, Post } from "@/app/types/types";
import Link from "next/link";

function loadPost(id: string) {
  return fetch(`http://localhost:3001/posts/${id}`).then((response) =>
    response.json(),
  );
}

function loadUser(id: string) {
  return fetch(`http://localhost:3001/users/${id}`).then((response) =>
    response.json(),
  );
}

function loadComments(postId: string) {
  return fetch(`http://localhost:3001/posts/${postId}/comments`).then((response) =>
    response.json(),
  );
}

export default async function Post({ params }: { params: { id: string } }) {
  const post: Post = await loadPost(params.id);
  const user = await loadUser(post.userId.toString());
  const comments: Comment[] = await loadComments(params.id)

  return (
    <>
      <h1 className="page-title">{post.title}</h1>
      <span className="page-subtitle">
        By: {' '}<Link href={`/users/${user.id}`}>{user.name}</Link>
      </span>
      <div>
        {post.body}
      </div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {
          comments.map(comment => (
            <div key={comment.id} className="card">
              <div className="card-body">
                <div className="text-sm mb-1">{comment.email}</div>
                {comment.body}
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}
