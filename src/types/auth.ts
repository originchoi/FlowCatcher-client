export interface AuthResponse {
  result: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
}

export interface UserStore {
  isLoggedIn: boolean;
  user: User | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User | null) => void;
}

export interface HeaderStateStore {
  headerState: string;
  setHeaderState: (headerState: string) => void;
}
