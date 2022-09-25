import AccountList from '../../pages/user';
import AccoutDetail from '../../pages/accountDetail';
import Layout from '../../components/layout';
import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';

export default function ACCOUNT_PATH(isAuth: boolean): RouteObject[] {
  return [
    {
      path: '/account',
      element: isAuth ? <Layout /> : <Navigate to="/" replace />,
      children: [
        { path: '', element: <AccountList /> },
        { path: ':id', element: <AccoutDetail /> },
      ],
    },
  ];
}
