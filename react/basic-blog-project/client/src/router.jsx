import './../styles.css';

import { Navigate, createBrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import { postsRoute } from './pages/Posts';
import { postRoute } from './pages/Post';
import { usersRoute } from './pages/Users';
import { userRoute } from './pages/User';
import { todosRoute } from './pages/Todos';
import { editpostRoute } from './pages/EditPost';

import ErrorElement from './pages/ErrorElement';
import { newPostRoute } from './pages/NewPost';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    children: [
      {
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: <Navigate to="/posts" />,
          },
          {
            path: '/posts',
            errorElement: <ErrorElement />,
            children: [
              {
                index: true,
                ...postsRoute,
              },
              {
                path: ':postId',
                children: [
                  {
                    index: true,
                    ...postRoute,
                  },
                  {
                    path: 'edit',
                    ...editpostRoute,
                  },
                ],
              },
              {
                path: 'new',
                ...newPostRoute,
              },
            ],
          },
          {
            path: '/users',
            children: [
              {
                index: true,
                ...usersRoute,
              },
              {
                path: ':userId',
                ...userRoute,
              },
            ],
          },
          {
            path: '/todos',
            children: [
              {
                index: true,
                ...todosRoute,
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
          },
        ],
      },
    ],
  },
]);
