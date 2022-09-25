import UserDetail from '../../pages/userDetail';
import Layout from '../../components/layout';
import { RouteObject } from 'react-router';
import Login from '../../pages/login';
import UserList from '../../pages/user';

const USER_PATH: RouteObject[] = [
  {
    path: '/',
    element: <Login />,
    children: [{}],
  },
  {
    path: '/user',
    element: <Layout />,
    children: [
      { path: '', element: <UserList /> },
      { path: ':id', element: <UserDetail /> },
    ],
  },
];

export default USER_PATH;
