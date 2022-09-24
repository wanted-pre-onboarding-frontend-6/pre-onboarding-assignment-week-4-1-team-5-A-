import { Card } from '@mui/material';
import Account from './AccountsTable';
import useGetAccountsQuery from '../../../queries/account/Accounts';
import { useState } from 'react';
import Error from '../../error';
import Loading from '../../../components/loading';

function Accounts() {
  const [accounts, setAccounts] = useState<Accounts[] | []>([]);

  const { error, isLoading } = useGetAccountsQuery(setAccounts);

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <Card>
      <Account cryptoOrders={accounts} />
    </Card>
  );
}

export default Accounts;

export interface Accounts {
  assets: string;
  broker_id: string;
  created_at: string;
  id: number;
  is_active: true;
  name: string;
  number: string;
  payments: string;
  status: number;
  updated_at: string;
  user_id: number;
  uuid: string;
}
