import userStorage from '../../utils/userStorage';
import Http from '../coreApi';

interface ParamsType {
  params?: string | object;
  data?: any;
  userId?: number | undefined;
}

interface LoginRequest {
  email: string;
  password: string;
}

class UserApi {
  http: any;
  path: string;
  accessToken: string | null;

  constructor() {
    this.accessToken = userStorage.get();
    this.http = new Http(
      process.env.REACT_APP_BASE_URL,
      this.accessToken ? this.accessToken : undefined,
    );
    this.path = '/users';
  }

  // public addUser({ data }: ParamsType) {
  //   return this.http.post(this.path, data);
  // }

  // public getList({ params }: ParamsType) {
  //   return this.http.get(this.path, params);
  // }

  // public getListALL() {
  //   return this.http.get(this.path);
  // }

  // public getInfo({ params }: ParamsType) {
  //   return this.http.get(this.path, params);
  // }

  public login(data: LoginRequest) {
    console.log(data);
    return this.http.post('/login', data);
  }

  // public getUserSetting({ params }: ParamsType) {
  //   return this.http.get('/userSetting', params);
  // }
}
export default new UserApi();
