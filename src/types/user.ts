export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface UserSession {
  id: number;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserSession;
}
