import { Profile } from '../common/types';
import { Activity } from '../diary/types';
import { Identity } from '../identity';

type ErrorDetails = string | [InputErrors];

export interface InputErrors {
  [x: string]: ErrorDetails;
}

export interface ApiError {
  statusCode: number;
  message: string;
  details?: InputErrors;
}

export interface ApiClient {
  login: (data: LoginDto) => Promise<Identity>;
  logout: () => Promise<void>;
  getProfile: () => Promise<Profile>;
  updateProfile: (data: UpdateProfileDto) => Promise<Profile>;
  changePassword: (data: ChangePasswordDto) => Promise<void>;
  forgotPassword: (data: ForgotPasswordDto) => Promise<void>;
  resetPassword: (data: ResetPasswordDto) => Promise<void>;

  searchActivities: (filter: ActivityFilterDto) => Promise<Activity[]>;
  addActivity: (data: ActivityDto) => Promise<Activity>;
  updateActivity: (id: string, data: ActivityDto) => Promise<Activity>;
  deleteActivity: (id: string) => Promise<void>;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UpdateProfileDto {
  displayName: string;
  avatar: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  password: string;
  token: string;
}

export interface ActivityFilterDto {
  text: string;
  tags: string[];
  from: Date;
  to: Date;
  limit: number;
  offset: number;
}

export interface ActivityDto {
  content: string;
  time: Date;
  tags: string[];
  income: number;
  outcome: number;
}
