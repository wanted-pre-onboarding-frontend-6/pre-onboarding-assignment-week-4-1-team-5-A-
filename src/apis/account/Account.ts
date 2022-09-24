import BaseApImpl from '../BaseApi';
import { BaseApi } from '../BaseApi';
import userStorage from '../../utils/userStorage';

class AccountApi extends BaseApImpl implements BaseApi {
  getAccounts = async () => {
    const { data } = await this.get();
    return data;
  };
  getAccount = async (params: number) => {
    const { data } = await this.get({ params: params });
    return data;
  };
}
export default new AccountApi(userStorage.get(), 'accounts');
