import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import userApi from '../../apis/user/userApi';
import { USER } from '../../utils/queryKeys';

const useListUser = <TData = AxiosResponse<any>>(
  { _page, _limit, _sort, _state }: any,
  options?: UseQueryOptions<AxiosResponse<any>, AxiosError<any>, TData, [string, any]>,
): UseQueryResult<TData, AxiosError<any>> =>
  useQuery(
    [USER, { _page, _limit, _sort, _state }],
    () => userApi.getList({ params: { _page, _limit, _sort } }),
    {
      ...options,
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
export default useListUser;
