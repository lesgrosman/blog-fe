import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/utils/auth/hooks/useUser'

const MyPosts = () => {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/signin')
  }, [user])
  return <h1>Private page Profile</h1>
}

export default MyPosts
