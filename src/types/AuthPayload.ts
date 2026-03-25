
export interface AuthPayload {
  mode: 'login' | 'register' | 'reset';
  name: string;
  identifier: string;
  password: string;
}
