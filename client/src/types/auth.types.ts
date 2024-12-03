export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  isCreator: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}
