import AccountList from '../../pages/user';
import AccoutDetail from '../../pages/accountDetail';
import Layout from '../../components/layout';
import { RouteObject } from 'react-router';

const ACCOUNT_PATH: RouteObject[] = [
  {
    path: '/account',
    element: <Layout />,
    children: [
      { path: '', element: <AccountList /> },
      { path: ':id', element: <AccoutDetail /> },
    ],
  },
];

export default ACCOUNT_PATH;
