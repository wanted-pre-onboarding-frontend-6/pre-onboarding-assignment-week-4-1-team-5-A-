import BaseApImpl from './BaseApi';
import { BaseApi } from './BaseApi';

class AccountApi extends BaseApImpl implements BaseApi {
  getAccountsList = async () => {
    const token = localStorage.getItem('accessToken');
    const { data } = await this.get('account', token);
    return data;
  };
  getAccount = async (params: string | number) => {
    const token = localStorage.getItem('accessToken');
    const { data } = await this.get('account', token, params);
    return data;
  };
}

export default new AccountApi();
