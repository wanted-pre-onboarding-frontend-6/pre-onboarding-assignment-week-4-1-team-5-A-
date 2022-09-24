import Http from '../coreApi';
import userStorage from '../../utils/userStorage';

interface ParamsType {
  params?: string | object;
  paramsSerializer?: any;
  data?: any;
  userId?: number | undefined;
  id?: number;
  name?: string;
}

class UserApi {
  http: any;
  path: string;
  token: string | null | undefined;

  constructor(token: string | null | undefined) {
    this.http = new Http(process.env.REACT_APP_BASE_URL, token ? token : undefined);
    this.path = '/users';
  }

  public addUser({ data }: ParamsType) {
    return this.http.post(this.path, data);
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

  public loginUser({ data }: ParamsType) {
    return this.http.post('/login', data);
  }

  public getUserSetting({ params }: ParamsType) {
    console.log(params);
    return this.http.get('/userSetting', params);
  }

  public deleteUser(id: number) {
    return this.http.delete(`/users/${id}`);
  }

  public updateUser({ id, newName }: { id: number; newName: string }) {
    return this.http.put(`/users/${id}`, {
      newName,
    });
  }
}
export default new UserApi(userStorage.get());
