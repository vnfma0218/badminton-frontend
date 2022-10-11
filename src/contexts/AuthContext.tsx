import React, { createContext, useState } from 'react'

interface AuthState {
  accessToken: string
  role: string
  updateAuthState: (token: string, role: string) => void
}

const defaultVal = {
  accessToken: '',
  role: '',
  updateAuthState: (token: string, role: string) => {},
}

const AuthContext = createContext(defaultVal)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setAuth] = useState(defaultVal)

  const updateAuthState = (token: string, role: string) => {
    setAuth((prev) => ({ ...prev, accessToken: token, role }))
  }

  const authCtx: AuthState = {
    accessToken: state.accessToken,
    role: state.role,
    updateAuthState: updateAuthState,
  }

  return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
}
export default AuthContext
