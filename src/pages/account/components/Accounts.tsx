import { Card } from '@mui/material';
import AccountsTable from './AccountsTable';
import useGetAccountsQuery from '../../../queries/account/Accounts';
import Error from '../../error';
import Loading from '../../../components/loading';
import { useSetRecoilState } from 'recoil';
import { accountsState } from '../../../recoil/account/atoms';
import Account from '../../../apis/account/AccountApi';

export default function Accounts(): JSX.Element {
  const setAccountsState = useSetRecoilState(accountsState);

  const { error, isLoading } = useGetAccountsQuery(setAccountsState);

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <Card>
      <AccountsTable />
    </Card>
  );
}
