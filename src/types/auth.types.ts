/**
 * 인증 관련 타입 정의
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  created_at: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface AuthError {
  message: string;
  code?: string;
}
