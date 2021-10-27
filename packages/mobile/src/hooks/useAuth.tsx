import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState
} from 'react'
import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { api } from '../services/api'

const CLIENT_ID = 'f6ac7185757678a3dfa6'
const SCOPE = 'read:user'

const USER_STORAGE = '@nlwheat:user'
const TOKEN_STORAGE = '@nlwheat:token'

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

interface AuthResponse {
  token: string,
  user: IUser
}

interface AuthorizationResponse {
  params: {
    code?: string
    error?: string
  },
  type?: string
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isSigning, setIsSigning] = useState(true)
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE)
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE)

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`

        setUser(JSON.parse(userStorage))
      }

      setIsSigning(false)
    }

    loadUserStorageData()
  }, [])

  async function signIn() {
    try {
      setIsSigning(true)

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`

      const authSessionResponse = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

      if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const response = await api.post<AuthResponse>('authenticate', { code: authSessionResponse.params.code })

        const { user, token } = response.data

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
        await AsyncStorage.setItem(TOKEN_STORAGE, token)

        setUser(user)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSigning(false)
    }
  }

  async function signOut() {
    setUser(null)

    await AsyncStorage.removeItem(USER_STORAGE)
    await AsyncStorage.removeItem(TOKEN_STORAGE)
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