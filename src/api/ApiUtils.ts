import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Profile } from '../common/types';
import { sleep } from '../common/utils';
import { Activity } from '../diary/types';
import { Identity } from '../identity';
import {
  ApiClient,
  ApiError,
  ActivityDto,
  ActivityFilterDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  UpdateProfileDto,
} from './types';

export class ApiUtils implements ApiClient {
  private client: AxiosInstance;

  constructor(endpoint: string) {
    this.client = axios.create({ baseURL: endpoint });
  }

  request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    const result = this.client.request<T, R>(config);
    result.catch((error: AxiosError<ApiError>) => {
      const apiErr = new ApiError(error.message);
      apiErr.stack = error.stack;
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        apiErr.statusCode = error.response.status;
        apiErr.message = error.response.data.message;
        apiErr.details = error.response.data.details;
      }
      throw apiErr;
    });

    return result;
  }

  async login(data: LoginDto): Promise<Identity> {
    const resp = await this.request<Identity>({
      url: '/auth/admin/tokens',
      method: 'POST',
      data,
    });
    // const resp = await this.client.post<Identity>('/auth/admin/tokens', data);
    const identity: Identity = {
      displayName: resp.data.displayName,
      expireAt: new Date(resp.data.expireAt),
      // token won't be saved in local storage but in http cookie
      token: '',
      avatar: resp.data.avatar,
      email: resp.data.email,
      roles: resp.data.roles,
    };
    return identity;
  }

  async logout(): Promise<void> {
    // return this.client.delete('/auth/tokens/mine');
    return this.request({
      url: '/auth/tokens/mine',
      method: 'DELETE',
    });
  }

  async getProfile(): Promise<Profile> {
    const resp = await this.client.get<Profile>('/admin/accounts/me');
    return resp.data;
  }

  async updateProfile(data: UpdateProfileDto): Promise<Profile> {
    const resp = await this.client.patch<Profile>('/admin/accounts/me', data);
    return resp.data;
  }

  async changePassword(data: ChangePasswordDto): Promise<void> {
    await this.client.post<void>('/admin/accounts/me/password', data);
  }

  async forgotPassword(data: ForgotPasswordDto): Promise<void> {
    await this.client.post<void>('/admin/accounts/forgot-password', data);
  }

  async resetPassword(data: ResetPasswordDto): Promise<void> {
    await this.client.post<void>('/admin/accounts/reset-password', data);
  }

  async searchActivities(filter: ActivityFilterDto): Promise<Activity[]> {
    const resp = await this.client.get<Activity[]>('/diary/activities', {
      params: {
        text: filter.text,
        from: filter.from.toISOString(),
        to: filter.to.toISOString(),
        tags: filter.tags,
        offset: filter.offset,
        limit: filter.limit,
      },
    });
    return resp.data;
  }

  async addActivity(data: ActivityDto): Promise<Activity> {
    const resp = await this.client.post<Activity>('/diary/activities', data);
    return resp.data;
  }

  async updateActivity(id: string, data: ActivityDto): Promise<Activity> {
    const resp = await this.client.put<Activity>(`/diary/activities/${id}`, data);
    return resp.data;
  }

  async deleteActivity(id: string): Promise<void> {
    await this.client.delete<void>(`/diary/activities/${id}`);
  }
}

export const fakeApiUtils: ApiClient = {
  login: async () => {
    // const error = new ApiError('Network Error');
    // error.statusCode = 400;
    // throw error;
    await sleep(2000);
    const fakeIdenity: Identity = {
      displayName: 'Admin',
      token: '',
      expireAt: new Date(),
      email: '',
      roles: [],
    };
    return fakeIdenity;
  },

  logout: async () => undefined,

  getProfile: async () => {
    return {
      displayName: 'Admin',
      email: 'john@gmail.com',
    };
  },

  updateProfile: async () => {
    return {
      displayName: 'Admin',
      email: 'john@gmail.com',
    };
  },

  changePassword: async () => undefined,

  forgotPassword: async () => undefined,

  resetPassword: async () => undefined,

  searchActivities: async () => {
    const models = [
      {
        id: '1',
        time: '2021-06-15T01:21:03.368Z',
        tags: ['play', 'gog'],
        income: 100.0,
        outcome: 0,
        content:
          'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\nmagnam aliquam quaerat voluptatem',
      },
      {
        id: '2',
        time: '2021-06-15T01:20:03.368Z',
        tags: ['play'],
        income: 0,
        outcome: 123.0,
        content: 'Nemo enim ipsam voluptatem',
      },
      {
        id: '3',
        time: '2021-06-15T01:19:03.368Z',
        tags: ['nec'],
        income: 0,
        outcome: 230.0,
        content:
          'At vero eos et accusamus et iusto odio dignissimos\nut aut reiciendis voluptatibus ',
      },
      {
        id: '4',
        time: '2021-06-14T01:21:03.368Z',
        tags: ['play', 'gog'],
        income: 100.0,
        outcome: 0,
        content:
          'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\nmagnam aliquam quaerat voluptatem',
      },
      {
        id: '5',
        time: '2021-06-14T01:20:03.368Z',
        tags: ['play'],
        income: 0,
        outcome: 123.0,
        content: 'Nemo enim ipsam voluptatem',
      },
      {
        id: '6',
        time: '2021-06-13T01:19:03.368Z',
        tags: ['nec'],
        income: 0,
        outcome: 230.0,
        content:
          'At vero eos et accusamus et iusto odio dignissimos\nut aut reiciendis voluptatibus ',
      },
    ];
    return models;
  },

  addActivity: async (data) => {
    return { ...data, id: 'newid', time: data.time.toISOString() };
  },

  updateActivity: async (id: string, data: ActivityDto) => {
    return { ...data, id, time: data.time.toISOString() };
  },

  deleteActivity: async () => undefined,
};
