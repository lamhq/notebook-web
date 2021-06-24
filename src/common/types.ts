export interface ProfileFormModel {
  email: string;
  displayName: string;
}

export interface ChangePwdFormModel {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
