import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import userApi from '../../apis/user/userApi';
import { GET_USER_SETTING } from '../../utils/queryKeys';

const useSettingUser = <TData = AxiosResponse<any>>(
  { _page, _limit, _sort, _state, is_staff, is_active }: any,
  options?: UseQueryOptions<AxiosResponse<any>, AxiosError<any>, TData, [string, any]>,
): UseQueryResult<TData, AxiosError<any>> =>
  useQuery(
    [GET_USER_SETTING, { _page, _limit, _sort, _state }],
    () => userApi.getUserSetting({ params: { _page, _limit, _sort, _state, is_staff, is_active } }),
    {
      ...options,
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
export default useSettingUser;
