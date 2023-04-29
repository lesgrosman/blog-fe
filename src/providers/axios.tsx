import { createContext, useContext, useMemo } from 'react'
import { useAuthStore } from '@/utils/auth/store/authStore'
import Axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const AxiosContext = createContext({} as AxiosInstance)

const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const { accessToken } = useAuthStore()
  const axios = useMemo(() => {
    const axios = Axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    })

    axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      // Read token for anywhere, in this case directly from localStorage
      const token = accessToken
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })

    return axios
  }, [])

  return <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>
}

export const useAxiosAuth = () => useContext(AxiosContext)

export default AxiosProvider
