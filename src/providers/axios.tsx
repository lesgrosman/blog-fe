import { ACCESS_TOKEN, TOKEN_EXPIRES_IN } from './auth'
import { createContext, useContext, useMemo } from 'react'
import Axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const AxiosContext = createContext({} as AxiosInstance)

const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const axios = useMemo(() => {
    const axios = Axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    })

    axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      // Read token for anywhere, in this case directly from localStorage
      const token = localStorage.getItem(ACCESS_TOKEN)
      const expriresIn = localStorage.getItem(TOKEN_EXPIRES_IN)

      let tokenValid
      if (expriresIn) {
        const tokenValidTimeLeft = parseInt(expriresIn) - new Date().getTime()
        if (tokenValidTimeLeft > 0) {
          tokenValid = true
        }
      }

      if (token && expriresIn && tokenValid) {
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
