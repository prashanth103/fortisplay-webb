import { useState, type ReactNode } from 'react';
import { AuthContext, type AuthUser } from './AuthContextBase';

const STORAGE_KEY = 'peryaplay:so_id';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? { soId: stored, balance: 1250 } : null;
  });

  const login = (soId: string, password: string) => {
    if (!soId.trim() || !password.trim()) return false;
    sessionStorage.setItem(STORAGE_KEY, soId);
    setUser({ soId, balance: 1250 });
    return true;
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
