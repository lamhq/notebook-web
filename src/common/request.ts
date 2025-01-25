import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { AsyncFn } from './types';

export function createAxiosRequest(baseParams?: AxiosRequestConfig) {
  const requestFn: AsyncFn<AxiosRequestConfig, AxiosResponse> = async (args) =>
    axios({
      ...baseParams,
      ...args,
    });
  return requestFn;
}
