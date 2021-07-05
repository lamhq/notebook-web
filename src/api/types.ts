import { Profile } from '../common/types';
import { Activity, ActivityFilterModel, Revenue } from '../diary/types';
import { Identity } from '../identity';

type ErrorDetails = string | [InputErrors];

export enum ApiErrorCode {
  NetworkError = 0,
  BadRequest = 400,
  Unauthenticated = 401,
  Unauthorized = 403,
  Notfound = 404,
  ServerError = 500,
}

export type ApiErrorHandler = (error: ApiError) => Promise<boolean>;

export interface InputErrors {
  [x: string]: ErrorDetails;
}

export class ApiError extends Error {
  public statusCode?: ApiErrorCode = ApiErrorCode.NetworkError;

  public details?: InputErrors;
}

export interface ApiClient {
  login: (data: LoginDto) => Promise<Identity>;
  logout: () => Promise<void>;
  getProfile: () => Promise<Profile>;
  updateProfile: (data: UpdateProfileDto) => Promise<Profile>;
  changePassword: (data: ChangePasswordDto) => Promise<void>;
  forgotPassword: (data: ForgotPasswordDto) => Promise<void>;
  resetPassword: (data: ResetPasswordDto) => Promise<void>;

  searchActivities: (filter: ActivityFilterModel) => Promise<[Activity[], number]>;
  addActivity: (data: ActivityDto) => Promise<Activity>;
  updateActivity: (id: string, data: ActivityDto) => Promise<Activity>;
  deleteActivity: (id: string) => Promise<void>;

  getTags: () => Promise<string[]>;
  getRevenue: (from?: Date, to?: Date) => Promise<Revenue>;
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

export interface ActivityDto {
  content: string;
  time: Date;
  tags: string[];
  income: number;
  outcome: number;
}
