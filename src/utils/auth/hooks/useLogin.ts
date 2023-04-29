import { AuthStore, setAccessToken, useAuthStore } from '../store/authStore'
import { AxiosCustomError, User } from '@/utils/types'
import { SignInForm } from '@/modules/auth/utils'
import { useCallback, useState } from 'react'
import axios from 'axios'

type UseLogin = {
  login: ({ username, password }: SignInForm) => Promise<void>
  loading: boolean
  error: AxiosCustomError | null
}

const selectorSetUser = (state: AuthStore) => state.setUser

export const useLogin = (): UseLogin => {
  const setUser = useAuthStore(selectorSetUser)

  //state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosCustomError | null>(null)

  const login = useCallback(
    async ({ username: usernameForm, password }: SignInForm) => {
      try {
        setLoading(true)
        if (error) setError(null)

        // signin
        const responseLogin = await axios.post<User & { accessToken: string }>(
          `${process.env.NEXT_PUBLIC_API}/auth/signin`,
          {
            username: usernameForm,
            password,
          },
          { withCredentials: true }
        )

        const { id, firstName, lastName, username, createdAt, accessToken } = responseLogin?.data

        if (!accessToken) throw new Error('No access token')

        const refreshToken = responseLogin.headers?.['set-cookie']?.[0]

        axios.defaults.headers.Cookie = refreshToken || 'dumb thing'

        setAccessToken(accessToken)
        setUser({ id, firstName, lastName, username, createdAt } as User)
        setLoading(false)
      } catch (err) {
        setUser(null)
        setLoading(false)
        setError(err as AxiosCustomError)
      }
    },
    [error, setUser, setAccessToken]
  )

  return { login, loading, error }
}
