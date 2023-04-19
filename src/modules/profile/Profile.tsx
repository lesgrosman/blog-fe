import { useAuthContext } from '@/providers/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Profile = () => {
  const router = useRouter()
  const { isUser } = useAuthContext()

  useEffect(() => {
    if (!isUser) {
      router.push('/signin')
    }
  }, [isUser])

  return <h1>Private page Profile</h1>
}

export default Profile
