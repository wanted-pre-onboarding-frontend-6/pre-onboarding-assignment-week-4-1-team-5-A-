import { useQuery } from '@tanstack/react-query';
import AccountApi from '../../apis/Account';

export default function accountsListQuery() {
  return useQuery(['accountsListQuery'], () => AccountApi.getAccountsList(), {
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 30,
    onError: (err) => {},
    onSuccess: (data) => {},
  });
}
