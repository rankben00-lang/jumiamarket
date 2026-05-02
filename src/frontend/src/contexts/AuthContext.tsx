import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { type ReactNode, createContext, useContext } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoggingIn: boolean;
  principal: Principal | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    login,
    clear,
  } = useInternetIdentity();

  const principal = identity?.getPrincipal() ?? null;

  const logout = () => {
    clear();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitializing,
        isLoggingIn,
        principal,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
