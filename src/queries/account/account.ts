import { useQuery } from '@tanstack/react-query';
import AccountApi from '../../apis/account/AccountApi';

export default function useGetAccountQuery(id: number) {
  return useQuery(['accountQuery'], () => AccountApi.getAccount(id), {
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
