import React, { createContext, useState } from 'react';

type AuthState = {
  accessToken: string;
  role: string;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>> | undefined;
};
const AuthContext = createContext<AuthState>({
  accessToken: '',
  role: '',
  setAuth: undefined,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    accessToken: '',
    role: '',
    setAuth: undefined,
  });

  return (
    <AuthContext.Provider
      value={{
        accessToken: auth.accessToken,
        role: auth.role,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
