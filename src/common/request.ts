import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { RequestFn } from './api';

/**
 * Response: type of response.body
 * Request: type of request.body
 */
export type AxiosRequestFn<Response, Request> = RequestFn<
  AxiosRequestConfig<Request>,
  AxiosResponse<Response, Request>
>;

export function requestFactory<Response, Request>(
  baseParams?: AxiosRequestConfig<Request>,
): AxiosRequestFn<Response, Request> {
  return async (args: AxiosRequestConfig<Request>) => {
    const result: AxiosResponse<Response, Request> = await axios({
      ...baseParams,
      ...args,
    });
    return result;
  };
}

export const request = requestFactory({ baseURL: '/api' });
