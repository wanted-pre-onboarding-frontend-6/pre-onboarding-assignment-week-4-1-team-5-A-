import { useQuery } from '@tanstack/react-query';
import AccountApi from '../../apis/account/Account';

export default function useGetAccountQuery(param: number) {
  return useQuery(['accountQuery'], () => AccountApi.getAccount(param), {
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 30,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      console.log(data, 'data');
    },
  });
}
