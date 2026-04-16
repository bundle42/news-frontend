import { createContext, useContext, useEffect, useState } from "react";
import { getMe, logout as apiLogout } from "../api/auth";
import type { Member } from "../types/member";

type AuthContextType = {
  user: Member | null;
  loading: boolean;
  loginCheck: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const loginCheck = async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
    }
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, loginCheck, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
