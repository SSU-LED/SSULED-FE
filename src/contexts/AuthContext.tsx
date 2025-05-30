import React from "react";
import { useAuthProvider, AuthContext } from "./AuthStore";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const contextValue = useAuthProvider();

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
