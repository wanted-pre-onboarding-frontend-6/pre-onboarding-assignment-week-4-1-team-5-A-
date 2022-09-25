import { Card } from '@mui/material';
import AccountsTable from './AccountsTable';
import useGetAccountsQuery from '../../../queries/account/Accounts';
import Error from '../../error';
import Loading from '../../../components/loading';
import { accountsState } from '../../../recoil/account/atoms';
import { useSetRecoilState } from 'recoil';

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
