import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { removeEmptyFields } from '../../common/utils';
import {
  Activity,
  ActivityFilter,
  ActivityForm,
  ApiClient,
  Revenue,
} from '../types';
import { buildQueryFromFilter } from '../utils';

export default class ApiUtils implements ApiClient {
  private client: AxiosInstance;

  constructor(endpoint: string) {
    this.client = axios.create({ baseURL: endpoint });
  }

  async request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    try {
      const result = await this.client.request<T, R>(config);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async searchActivities(filter: ActivityFilter): Promise<[Activity[], number]> {
    const resp = await this.request<Activity[]>({
      url: '/diary/activities',
      method: 'GET',
      params: buildQueryFromFilter(filter),
    });
    const total = parseInt(resp.headers['x-total-count'] as string, 10);
    return [resp.data, Math.ceil(total / filter.pageSize)];
  }

  async getRevenue(filter: ActivityFilter): Promise<Revenue> {
    const params = buildQueryFromFilter(filter);
    if (!params.from || !params.to) {
      return { income: 0, outcome: 0 };
    }

    const resp = await this.request<Revenue>({
      url: '/diary/stat/revenue',
      method: 'GET',
      params,
    });
    return resp.data;
  }

  async addActivity(data: ActivityForm): Promise<Activity> {
    const resp = await this.request<Activity>({
      url: '/diary/activities',
      method: 'POST',
      data: removeEmptyFields(data),
    });
    return resp.data;
  }

  async updateActivity(id: string, data: ActivityForm): Promise<Activity> {
    const resp = await this.request<Activity>({
      url: `/diary/activities/${id}`,
      method: 'PUT',
      data: removeEmptyFields(data),
    });
    return resp.data;
  }

  async deleteActivity(id: string): Promise<void> {
    await this.request({
      url: `/diary/activities/${id}`,
      method: 'DELETE',
    });
  }

  async getActivity(id: string): Promise<Activity> {
    const resp = await this.request<Activity>({
      url: `/diary/activities/${id}`,
      method: 'GET',
    });
    return resp.data;
  }

  async getTags(): Promise<string[]> {
    const resp = await this.request<string[]>({
      url: '/diary/tags',
      method: 'GET',
    });
    return resp.data;
  }
}
