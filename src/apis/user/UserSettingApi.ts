import userStorage from '../../utils/userStorage';
import BaseApiImpl, { BaseApi } from '../BaseApi';

class UserSettingApi extends BaseApiImpl implements BaseApi {
  async getUserSetting() {
    const response = await this.get('');
    return response.data;
  }
}
export default new UserSettingApi(userStorage.get(), '/userSetting');
