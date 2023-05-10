import { SignUpForm } from './utils'
import axios from 'axios'

export const signup = async (signupCredentials: SignUpForm): Promise<void> => {
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/signup`, signupCredentials)
  return data
}
