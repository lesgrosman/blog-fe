import { User } from '@/utils/types'
import { create } from 'zustand'

export type AuthStore = {
  accessToken: string | null
  user: User | null
  setAccessToken: (accessToken: string | null) => void
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>(set => ({
  accessToken: null,
  user: null,
  setAccessToken: accessToken =>
    set({
      accessToken,
    }),
  setUser: (newUser = null) =>
    set({
      user: newUser,
    }),
}))

export const getAccessToken = (): string | null => useAuthStore.getState().accessToken

export const setAccessToken = (accessToken: string | null): void =>
  useAuthStore.getState().setAccessToken(accessToken)

export const removeAccessToken = (): void => useAuthStore.getState().setAccessToken(null)
