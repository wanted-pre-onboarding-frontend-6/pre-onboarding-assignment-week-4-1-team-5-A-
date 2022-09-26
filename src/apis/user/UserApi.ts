import userStorage from '../../utils/userStorage';
import BaseApiImpl, { BaseApi } from '../BaseApi';

class UserApi extends BaseApiImpl implements BaseApi {
  async getUsers() {
    const { data } = await this.get('');
    return data;
  }
  async getUserById(id: number) {
    const { data } = await this.get(`/${id}`);
    return data;
  }
}
export default new UserApi(userStorage.get(), 'users');
