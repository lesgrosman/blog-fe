import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/utils/auth/hooks/useUser'
import Button from '@/components/Button'
import FetchPosts from './FetchPosts'

const MyPosts = () => {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/signin')
  }, [user])

  const handleClickCreate = () => router.push('/profile/create')

  return (
    <div>
      <div className='flex gap-4 mb-10'>
        <h2>My posts</h2>
        <Button label='Create post' onClick={handleClickCreate} />
      </div>
      <FetchPosts />
    </div>
  )
}

export default MyPosts
