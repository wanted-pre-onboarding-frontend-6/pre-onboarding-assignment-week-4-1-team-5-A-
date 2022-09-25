import Http from '../coreApi';
import userStorage from '../../utils/userStorage';

interface ParamsType {
  params?: string | object;
  paramsSerializer?: any;
  data?: any;
  userId?: number | undefined;
}

class AccountApi {
  http: any;
  path: string;

  constructor(token: string | null | undefined) {
    this.http = new Http(process.env.REACT_APP_API_URL, token ? token : undefined);
    this.path = '/accounts';
  }

  public getList({ params, paramsSerializer }: ParamsType) {
    if (paramsSerializer) {
      return this.http.get(`${this.path}?${paramsSerializer}`, params);
    }

    return this.http.get(this.path, params);
  }

  public getListALL() {
    return this.http.get(this.path);
  }

  public getInfo({ params }: ParamsType) {
    return this.http.get(this.path, params);
  }

  public getCount(userId: number) {
    return this.http.get(`/accounts/?user_id=${userId}`);
  }
}
export default new AccountApi(userStorage.get());
