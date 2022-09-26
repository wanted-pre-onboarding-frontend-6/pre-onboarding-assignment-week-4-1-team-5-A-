import BaseApImpl from '../BaseApi';
import { BaseApi } from '../BaseApi';
import userStorage from '../../utils/userStorage';
import { AxiosRequestConfig } from 'axios';

class AccountApi extends BaseApImpl implements BaseApi {
  getAccounts = async (searchparams?: AxiosRequestConfig) => {
    const { data } = await this.get('', searchparams);
    return data;
  };
  getAccount = async (id: string) => {
    const { data } = await this.get(`/${id}`);
    return data;
  };
}
export default new AccountApi(userStorage.get(), 'accounts');
