import { ACCESS_TOKEN, TOKEN_EXPIRES_IN, useAuthContext } from '@/providers/auth'
import { AxiosCustomError } from '../types'
import { SignInForm } from '@/modules/auth/utils'
import { useCallback, useState } from 'react'
import axios from 'axios'

type UseAuth = {
  login: ({ username, password }: SignInForm) => Promise<void>
  logout: () => void
  loading: boolean
  error: AxiosCustomError | null
}

export const useAuth = (): UseAuth => {
  //state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosCustomError | null>(null)

  //auth store
  const { setIsUser, setToken } = useAuthContext()

  const login = useCallback(
    async ({ username, password }: SignInForm) => {
      try {
        setLoading(true)
        if (error) setError(null)

        // signin
        const responseLogin = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/signin`, {
          username,
          password,
        })

        const token = responseLogin?.data?.accessToken

        if (!token) throw new Error('No access token')

        setToken({
          accessToken: responseLogin.data.access_token,
          expiresIn: new Date().getTime() + 3600 * 1000,
        })
        setIsUser(true)
        localStorage.setItem(ACCESS_TOKEN, token)
        localStorage.setItem(TOKEN_EXPIRES_IN, (new Date().getTime() + 3600 * 1000).toString())
      } catch (err) {
        setIsUser(false)
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(TOKEN_EXPIRES_IN)
        setLoading(false)
        setError(err as AxiosCustomError)
      }
    },
    [error, setIsUser, setToken]
  )

  const logout = () => {
    setToken(null)
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(TOKEN_EXPIRES_IN)
  }

  return { login, logout, loading, error }
}
