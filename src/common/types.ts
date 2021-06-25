export interface ProfileFormModel {
  email: string;
  displayName: string;
}

export interface ChangePwdFormModel {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPwdFormModel {
  email: string;
}

export interface ResetPwdFormModel {
  newPassword: string;
  confirmPassword: string;
}
