import './../styles.css';

import { createBrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Posts from './pages/Posts';
import Post from './pages/Post';
import Users from './pages/Users';
import User from './pages/User';
import Todos from './pages/Todos';
import ErrorElement from './pages/ErrorElement';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    children: [
      {
        path: '/posts',
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            loader: ({ request: { signal } }) =>
              fetch('http://localhost:3000/posts', { signal }),
            element: <Posts />,
            errorElement: <ErrorElement />,
          },
          {
            path: '/posts:postId',
            loader: async ({ params, request: { signal } }) => {
              const postResponse = await fetch(
                `http://localhost:3000/posts/${params.postId}`,
                {
                  signal,
                }
              );
              const post = await postResponse.json();

              const authorResponse = await fetch(
                `http://localhost:3000/users/${post.userId}`,
                {
                  signal,
                }
              );
              const author = await authorResponse.json();

              const commentResponse = await fetch(
                `http://localhost:3000/posts/${params.postId}/comments`,
                { signal }
              );
              const comments = await commentResponse.json();

              return { post, author, comments };
            },
            element: <Post />,
            errorElement: <ErrorElement />,
          },
        ],
      },
      {
        path: '/users',
        children: [
          {
            index: true,
            loader: ({ request: { signal } }) => {
              return fetch('http://localhost:3000/users', { signal });
            },
            element: <Users />,
            errorElement: <ErrorElement />,
          },
          {
            path: '/users:userId',
            loader: async ({ params, request: { signal } }) => {
              const userResponse = await fetch(
                `http://localhost:3000/users/${params.userId}`,
                { signal }
              );
              const user = await userResponse.json();

              const userPostsResponse = await fetch(
                `http://localhost:3000/posts?userId=${params.userId}`,
                { signal }
              );
              const userPosts = await userPostsResponse.json();

              const userTodosResponse = await fetch(
                `http://localhost:3000/todos?userId=${params.userId}`,
                { signal }
              );
              const userTodos = await userTodosResponse.json();

              return { user, userPosts, userTodos };
            },
            element: <User />,
            errorElement: <ErrorElement />,
          },
        ],
      },
      {
        path: '/todos',
        children: [
          {
            index: true,
            loader: () => fetch('http://localhost:3000/todos'),
            element: <Todos />,
          },
        ],
      },
      {
        path: '/*',
        element: (
          <div className="container">
            <h2>404</h2>
          </div>
        ),
        errorElement: <ErrorElement />,
      },
    ],
  },
]);
