import { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export let globalAuthLogin: ((token: string) => void) | null = null;
export let globalAuthLogout: (() => void) | null = null;

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const useAuthProvider = (): AuthContextType => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((newToken: string) => {
    localStorage.setItem("accessToken", newToken);
    setAuthToken(newToken);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuthToken(null);
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    globalAuthLogin = login;
    globalAuthLogout = logout;
    return () => {
      globalAuthLogin = null;
      globalAuthLogout = null;
    };
  }, [login, logout]);

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      login(savedToken);
    }
    setIsLoading(false); // 로딩 완료
  }, [login]);

  return { isLoggedIn, token: authToken, isLoading, login, logout };
};