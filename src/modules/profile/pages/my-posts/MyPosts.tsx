import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/utils/auth/hooks/useUser'
import Button from '@/components/Button'

const MyPosts = () => {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/signin')
  }, [user])

  const handleClickCreate = () => router.push('/profile/create')

  return (
    <div className='flex gap-4'>
      <h1>Private page Profile</h1>
      <Button label='Create post' onClick={handleClickCreate} />
    </div>
  )
}

export default MyPosts
