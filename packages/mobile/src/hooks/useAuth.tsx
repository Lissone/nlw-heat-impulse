import React, { 
  createContext, 
  useContext, 
  useState
} from 'react'

interface IUser {
  id: string
  name: string
  login: string
  avatarUrl: string
}

interface AuthContextData {
  user: IUser | null
  isSigning: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isSigning, setIsSigning] = useState(false)
  const [user, setUser] = useState<IUser | null>(null)

  async function signIn() {

  }

  async function signOut() {

  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isSigning,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}