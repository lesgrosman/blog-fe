import { AuthStore, setAccessToken, useAuthStore } from '../store/authStore'
import { AxiosCustomError } from '../../types'
import { useCallback, useState } from 'react'
import axios from 'axios'

type UseLogout = {
  logout: () => void
  loading: boolean
  error: AxiosCustomError | null
}

const selectorSetUser = (state: AuthStore) => state.setUser

export const useLogout = (): UseLogout => {
  const setUser = useAuthStore(selectorSetUser)

  //state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosCustomError | null>(null)

  const logout = useCallback(async () => {
    try {
      setLoading(true)
      if (error) setError(null)

      // logout
      const responseLogout = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )

      if (!responseLogout) throw new Error('Something went wrong')

      setLoading(false)
      setAccessToken(null)
      setUser(null)
    } catch (err) {
      setLoading(false)
      setError(err as AxiosCustomError)
    }
  }, [error])

  return { logout, loading, error }
}
