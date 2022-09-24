import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface BaseApi {
  get?<T = any, R = AxiosResponse<T>>(config?: AxiosRequestConfig<T>): Promise<R>;

  post?<T = any, R = AxiosResponse<T>>(data?: T, config?: AxiosRequestConfig<T>): Promise<R>;

  put?<T = any, R = AxiosResponse<T>>(data?: T, config?: AxiosRequestConfig<T>): Promise<R>;

  delete?<T = any, R = AxiosResponse<T>>(config?: AxiosRequestConfig<T>): Promise<R>;
}

export type PAGE_PATH = string;
type Token = string | null;

class BaseApiImpl implements BaseApi {
  axios: AxiosInstance;
  pagePath: PAGE_PATH;

  constructor(token: Token, pagePath: PAGE_PATH) {
    this.axios = Axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    this.pagePath = pagePath;
  }

  async get<T = any, R = AxiosResponse<T>>(config?: AxiosRequestConfig<T>): Promise<R> {
    return await this.axios.get(this.pagePath, { ...config });
  }

  async post<T = any, R = AxiosResponse<T>>(data?: T, config?: AxiosRequestConfig<T>): Promise<R> {
    return await this.axios.post(this.pagePath, data, { ...config });
  }

  async put<T = any, R = AxiosResponse<T>>(data?: T, config?: AxiosRequestConfig<T>): Promise<R> {
    return await this.axios.put(this.pagePath, data, { ...config });
  }

  async delete<T = any, R = AxiosResponse<T>>(config?: AxiosRequestConfig<T>): Promise<R> {
    return await this.axios.delete(this.pagePath, { ...config });
  }
}

export default BaseApiImpl;
