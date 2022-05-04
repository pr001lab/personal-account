import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getToken} from './token';

const BACKEND_URL = 'http://localhost:3001';

const REQUEST_TIMEOUT = 5000;

const HEADERS_TOKEN = 'Authorization';

enum HttpCode {
  Unauthorized = 401,
}

type UnauthorizedCallback = () => void;

export const createAPI = (onUnauthorized: UnauthorizedCallback):
  AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers !== undefined) {
        config.headers[HEADERS_TOKEN] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const {response} = error;

      if (response?.status === HttpCode.Unauthorized) {
        onUnauthorized();
      }

      return Promise.reject(error);
    },
  );

  return api;
};
