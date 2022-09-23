import { useQuery } from '@tanstack/react-query';
import AccountApi from '../../apis/Account';

export default function accountsListQuery(id: number) {
  return useQuery(['accountsListQuery'], () => AccountApi.getAccount(id), {
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 30,
    onError: (err) => {},
    onSuccess: (data) => {},
  });
}
