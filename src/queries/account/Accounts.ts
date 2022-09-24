import { useQuery } from '@tanstack/react-query';
import AccountApi from '../../apis/account/Account';
import { Accounts } from '../../pages/account/components/Accounts';

export default function useGetAccountsQuery(
  setdata: React.Dispatch<React.SetStateAction<[] | Accounts[]>>,
) {
  return useQuery(['accountsQuery'], () => AccountApi.getAccounts(), {
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 30,
    onError: (err) => {
      console.log(err, 'err');
    },
    onSuccess: (data) => {
      console.log(data);

      setdata(data);
    },
  });
}
