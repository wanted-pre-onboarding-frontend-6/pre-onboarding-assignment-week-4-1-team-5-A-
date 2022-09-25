import { AnyAaaaRecord } from 'dns';
import BaseApiImpl from '../BaseApi';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

class AuthApi extends BaseApiImpl {
  public async login(form: any) {
    const response = await this.post('', form);
    return response.data;
  }
}
export default new AuthApi('', 'login');
