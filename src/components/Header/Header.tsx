import { useUser } from '@/utils/auth/hooks/useUser'
import Dropdown from './Menu'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  const user = useUser()

  return (
    <nav className='w-screem bg-cyan-600 text-white h-[100px] p-0 items-center lg:px-0 px-8 mb-10'>
      <div className='flex justify-between max-w-6xl m-auto h-full items-center'>
        <Link href='/'>
          <Image src='/logo.svg' alt='logo' width={200} height={140} />
        </Link>
        {user ? (
          <div className='flex items-center gap-8'>
            <div className='sm:flex hidden gap-4'>
              <Link href='/profile/my-posts'>My posts</Link>
              <Link href='/profile/create'>Create Post</Link>
            </div>
            <Dropdown />
          </div>
        ) : (
          <div className='flex gap-4'>
            <Link href='/signin'>Sign In</Link>
            <Link href='/signup'>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header
