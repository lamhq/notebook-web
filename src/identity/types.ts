export interface Identity {
  id: string;
  displayName: string;
  token: string;
  expireAt: Date;
  avatar?: string;
  email: string;
  roles: string[];
}
