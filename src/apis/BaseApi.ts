import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface BaseApi {
  get?<T = any, R = AxiosResponse<T>>(url?: string, config?: AxiosRequestConfig<T>): Promise<R>;

  post?<T = any, R = AxiosResponse<T>>(
    url?: string,
    data?: T,
    config?: AxiosRequestConfig<T>,
  ): Promise<R>;

  put?<T = any, R = AxiosResponse<T>>(
    url?: string,
    data?: T,
    config?: AxiosRequestConfig<T>,
  ): Promise<R>;

  delete?<T = any, R = AxiosResponse<T>>(url?: string, config?: AxiosRequestConfig<T>): Promise<R>;
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

  async get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig<T>,
  ): Promise<R> {
    return await this.axios.get(this.pagePath + url, { ...config });
  }

  async post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig<T>,
  ): Promise<R> {
    return await this.axios.post(this.pagePath + url, data, { ...config });
  }

  async put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig<T>,
  ): Promise<R> {
    return await this.axios.put(this.pagePath + url, data, { ...config });
  }

  async delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig<T>,
  ): Promise<R> {
    return await this.axios.delete(this.pagePath + url, { ...config });
  }
}

export default BaseApiImpl;
