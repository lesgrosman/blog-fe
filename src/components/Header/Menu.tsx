import {
  ArrowLeftOnRectangleIcon,
  ListBulletIcon,
  PlusIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useLogout } from '@/utils/auth/hooks/useLogout'
import Link from 'next/link'

const Dropdown = () => {
  const { logout } = useLogout()

  return (
    <div>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button>
            <UserCircleIcon className='h-10 w-10' aria-hidden='true' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 '>
              <div className='sm:hidden block'>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href='/profile/my-posts'
                      className={`${
                        active ? 'bg-primary-default text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <ListBulletIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                      My posts
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href='/profile/create'
                      className={`${
                        active ? 'bg-primary-default text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <PlusIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                      Create Post
                    </Link>
                  )}
                </Menu.Item>
              </div>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${
                      active ? 'bg-primary-default text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <ArrowLeftOnRectangleIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Dropdown
