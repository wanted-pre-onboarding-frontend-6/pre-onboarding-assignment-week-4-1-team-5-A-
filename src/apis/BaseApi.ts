import axios, { AxiosInstance, AxiosRequestHeaders, AxiosResponse } from 'axios';

export interface BaseApi {
  createAxios?(token: string, headerOption?: AxiosRequestHeaders): AxiosInstance;

  get?(
    url: string,
    token: string,
    formData: string,
    headerOption?: AxiosRequestHeaders,
  ): Promise<AxiosResponse<any, any>>;

  post?(
    url: string,
    data: string,
    token: string,
    headerOption?: AxiosRequestHeaders,
  ): Promise<AxiosResponse<any, any>>;
}

class BaseApiImpl implements BaseApi {
  createAxios(token: string | null, headerOption?: AxiosRequestHeaders) {
    return axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...headerOption,
      },
    });
  }

  async get(
    url: string,
    token: string | null,
    formData?: string | number,
    headerOption?: AxiosRequestHeaders,
  ) {
    const axios = this.createAxios(token, headerOption);
    return await axios.get(url, { params: formData });
  }

  async post(url: string, data: string, token: string, headerOption?: AxiosRequestHeaders) {
    const axios = this.createAxios(token, headerOption);
    return await axios.post(url, data);
  }
}

export default BaseApiImpl;
