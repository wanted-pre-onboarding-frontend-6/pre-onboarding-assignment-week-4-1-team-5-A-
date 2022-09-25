import UserDetail from '../../pages/userDetail';
import Layout from '../../components/layout';
import { RouteObject } from 'react-router';
import Login from '../../pages/login';
import { Navigate } from 'react-router-dom';
import UserList from '../../pages/user';

export default function USER_PATH(isAuth: boolean): RouteObject[] {
  return [
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/user',
      element: isAuth ? <Layout /> : <Navigate to="/" replace />,
      children: [
        { path: '', element: <UserList /> },
        { path: ':id', element: <UserDetail /> },
      ],
    },
  ];
}
