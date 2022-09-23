import User from '../../pages/user';
import UserDetail from '../../pages/userDetail';
import Layout from '../../components/layout';
import { RouteObject } from 'react-router';
import Login from '../../pages/login';

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
      { path: '', element: <User /> },
      { path: ':id', element: <UserDetail /> },
    ],
  },
];

export default USER_PATH;
