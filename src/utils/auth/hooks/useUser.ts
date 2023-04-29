import { AuthStore, useAuthStore } from '../store/authStore'
import { User } from '@/utils/types'

// selector
const selectorUser = (state: AuthStore) => state.user

export const useUser = (): User | null => useAuthStore(selectorUser)
