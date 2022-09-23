import BaseApImpl from './BaseApi';
import { BaseApi } from './BaseApi';

class AccountApi extends BaseApImpl implements BaseApi {
  getAccounts = async () => {
    const token = localStorage.getItem('accessToken');
    const { data } = await this.get('account', token);
    return data;
  };
}
