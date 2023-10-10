import {
  Outlet,
  createBrowserRouter,
  redirect,
  useNavigation,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Shop } from './pages/Shop';
import { Navbar } from './Navbar';
import { Team } from './pages/Team';
import { TeamMember } from './pages/TeamMember';
import { TeamNav } from './TeamNav';

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/contact', element: <Contact /> },
      { path: '/shop', element: <Shop /> },
      {
        path: '/team',
        element: <TeamNavLayout />,
        loader: ({ request: { signal } }) => {
          return fetch('https://jsonplaceholder.typicode.com/users', {
            signal,
          });
        },
        children: [
          { index: true, element: <Team /> },
          {
            path: ':memberId',
            loader: ({ params, request: { signal } }) => {
              return fetch(
                `https://jsonplaceholder.typicode.com/users/${params.memberId}`,
                { signal }
              ).then((res) => {
                if (res.ok) {
                  return res.json();
                }
                throw redirect('/team');
              });
            },
            element: <TeamMember />,
          },
        ],
      },
    ],
  },
]);

function NavLayout() {
  const { state } = useNavigation();

  return (
    <>
      <Navbar />
      {state === 'loading' ? <h2>Loading...</h2> : <Outlet />}
    </>
  );
}

function TeamNavLayout() {
  return (
    <>
      <TeamNav />
      <Outlet context="Team context" />
    </>
  );
}
