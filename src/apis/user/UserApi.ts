import userStorage from '../../utils/userStorage';
import BaseApiImpl, { BaseApi } from '../BaseApi';

class UserApi extends BaseApiImpl implements BaseApi {
  async getUsers() {
    const response = await this.get('');
    return response.data;

  }
  // private getUsers(id: number) {
  //   const response = this.axios.get(`${id}`);
  //   return response;
  // }
  // private getUsers() {
  //   return this.axios.get('');
  // }
}
export default new UserApi(userStorage.get(), '/users');
