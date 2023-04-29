import { AuthStore, setAccessToken, useAuthStore } from '../store/authStore'
import { User } from '@/utils/types'
import { useEffect, useState } from 'react'
import axios from 'axios'

const selectorSetUser = (state: AuthStore) => state.setUser

export const useInitUser = (): boolean => {
  const [loading, setLoading] = useState(false)
  const setUser = useAuthStore(selectorSetUser)

  useEffect(() => {
    const initUser = async () => {
      try {
        const responseRefresh = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/auth/refresh`,
          {},
          { withCredentials: true }
        )

        const { accessToken } = responseRefresh.data

        if (!accessToken) throw new Error('No accessToken')

        setAccessToken(accessToken)

        const responseUser = await axios.get<User>(`${process.env.NEXT_PUBLIC_API}/auth/me`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })

        const { id, username, firstName, lastName, createdAt } = responseUser.data

        if (!id) throw new Error('No user')

        setUser({ id, username, firstName, lastName, createdAt })
        setLoading(false)
      } catch (e) {
        setAccessToken(null)
        setUser(null)
        setLoading(false)
      }
    }
    initUser()
  }, [])

  return loading
}
