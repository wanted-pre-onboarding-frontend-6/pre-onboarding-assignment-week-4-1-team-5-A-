import { useQuery } from '@tanstack/react-query';
import UsersApi from '../../apis/user/UserApi';

export default function useGetUsersQuery() {
  return useQuery(['useGetUsersQuery'], () => UsersApi.getUsers(), {
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 30,
  });
}
