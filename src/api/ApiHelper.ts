import axios, { AxiosInstance } from 'axios';
import { Profile } from '../common/types';
import { Identity } from '../identity';
import {
  ApiClient,
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  UpdateProfileDto,
} from './types';

export class ApiHelper implements ApiClient {
  private client: AxiosInstance;

  constructor(endpoint: string) {
    this.client = axios.create({ baseURL: endpoint });
  }

  async login(data: LoginDto): Promise<Identity> {
    const resp = await this.client.post<Identity>('/api/v1/auth/admin/tokens', data);
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
    return this.client.delete('/auth/tokens/mine');
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

  /*
  searchActivities: (filter: ActivityFilterDto) => Promise<Activity[]>;
  addActivity: (data: ActivityDto) => Promise<Activity>;
  updateActivity: (id: string, data: ActivityDto) => Promise<Activity>;
  deleteActivity: (id: string) => Promise<void>;
  */
}

export const fakeApiHelper: ApiClient = {
  login: async () => {
    const fakeIdenity: Identity = {
      displayName: 'Admin',
      token: '',
      expireAt: new Date(),
      email: '',
      roles: [],
    };
    return fakeIdenity;
  },

  logout: async () => {},

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

  changePassword: async () => {},

  forgotPassword: async () => {},

  resetPassword: async () => {},
};
