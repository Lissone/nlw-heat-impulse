import { createContext, ReactNode, useEffect, useState } from 'react'

import { api } from '../services/api'

interface IUser {
  id: string
  name: string
  login: string
  avatarUrl: string
}

interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    login: string
    avatarUrl: string
  }
}

interface AuthContextData {
  user: IUser | null
  signInUrl: string
  signOut: () => void
}

const AuthContext = createContext({} as AuthContextData)

interface AuthContextProviderProps {
  children: ReactNode
}

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`
  
  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('?code=')

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=')

      window.history.pushState({}, '', urlWithoutCode)

      signIn(githubCode)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token')

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`

      api.get<IUser>('/profile').then(response => {
        setUser(response.data)
      })
    }
  }, [])

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>('/authenticate', {
      code: githubCode
    })

    const { token, user } = response.data

    api.defaults.headers.common.authorization = `Bearer ${token}`

    localStorage.setItem('@dowhile:token', token)

    setUser(user)
  }

  function signOut() {
    setUser(null)

    localStorage.removeItem('@dowhile:token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInUrl,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }