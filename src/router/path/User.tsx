import User from '../../pages/user';
import UserDetail from '../../pages/userDetail';
import Layout from '../../components/layout';
import { RouteObject } from 'react-router';

const USER_PATH: RouteObject[] = [
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
