import { createContext } from 'react';

export interface AuthUser {
  soId: string;
  balance: number;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (soId: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
