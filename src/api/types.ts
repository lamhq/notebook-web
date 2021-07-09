import { Identity } from '../identity';
import { ChangePwdFormModel, LoginFormModel, Profile } from '../admin/types';
import { Activity, ActivityFilterModel, ActivityFormModel, Revenue } from '../diary/types';

export interface ApiClient {
  login: (data: LoginFormModel) => Promise<Identity>;
  logout: () => Promise<void>;
  getProfile: () => Promise<Profile>;
  updateProfile: (data: UpdateProfileDto) => Promise<Profile>;
  changePassword: (data: ChangePasswordDto) => Promise<void>;
  forgotPassword: (data: ForgotPasswordDto) => Promise<void>;
  resetPassword: (data: ResetPasswordDto) => Promise<void>;

  searchActivities: (filter: ActivityFilterModel) => Promise<[Activity[], number]>;
  addActivity: (data: ActivityFormModel) => Promise<Activity>;
  updateActivity: (id: string, data: ActivityFormModel) => Promise<Activity>;
  deleteActivity: (id: string) => Promise<void>;
  getActivity: (id: string) => Promise<Activity>;

  getTags: () => Promise<string[]>;
  getRevenue: (filter: ActivityFilterModel) => Promise<Revenue>;
}

export interface UpdateProfileDto {
  displayName: string;
  avatar: string;
}

export type ChangePasswordDto = Omit<ChangePwdFormModel, 'confirmPassword'>;

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  password: string;
  token: string;
}
