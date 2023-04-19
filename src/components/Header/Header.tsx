import { useAuthContext } from '@/providers/auth'
import Dropdown from './Menu'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  const { isUser } = useAuthContext()

  return (
    <div className='w-screem bg-cyan-600 text-white h-[100px] p-0 items-center'>
      <div className='flex justify-between max-w-6xl m-auto h-full items-center'>
        <Link href='/'>
          <Image src='/logo.svg' alt='logo' width={200} height={140} />
        </Link>
        {isUser ? (
          <Dropdown />
        ) : (
          <div className='flex gap-4'>
            <Link href='/signin'>Sign In</Link>
            <Link href='/signup'>Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
