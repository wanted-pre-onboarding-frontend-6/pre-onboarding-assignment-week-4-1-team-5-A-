import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';

class Http {
  baseURL: string | undefined;
  token: string | undefined;
  axios: AxiosInstance;

  /* constructor */
  constructor(baseURL: string | undefined, token?: string | undefined) {
    this.baseURL = baseURL;
    this.axios = axios.create({
      baseURL: `${baseURL}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (token) {
      this.token = token;
    }
  }

  /* axiosinstance */
  public axiosInstance(headerOption: AxiosRequestHeaders | undefined) {
    this.axios.interceptors.request.use(
      async (config: any) => {
        if (!this.token) {
          return config;
        }
        config.headers = {
          ...headerOption,
          Authorization: `Barear ${this.token}`,
        };
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );
  }

  /* method */
  protected async get(url: string, formData: any, headerOption?: AxiosRequestHeaders | undefined) {
    this.axiosInstance(headerOption);
    return await this.axios.get(url, { params: formData });
  }

  protected async post(url: string, data: any, headerOption?: AxiosRequestHeaders | undefined) {
    this.axiosInstance(headerOption);
    return await this.axios.post(url, data);
  }

  protected async put(url: string, data: any, headerOption?: AxiosRequestHeaders | undefined) {
    this.axiosInstance(headerOption);
    return await this.axios.put(url, data);
  }

  protected async delete(url: string, data: any, headerOption?: AxiosRequestHeaders | undefined) {
    this.axiosInstance(headerOption);
    return await this.axios.delete(url, { data });
  }
}
export default Http;
