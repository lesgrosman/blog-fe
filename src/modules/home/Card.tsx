import { PostItem } from '@/utils/types'
import Image from 'next/image'
import Link from 'next/link'
import LocalizedDate from '@/utils/components/LocalizedDate'
import React from 'react'

interface Props {
  post: PostItem
}

const Card = ({ post: { id, title, perex, createdAt, author, categories } }: Props) => {
  return (
    <div className='flex md:flex-row flex-col gap-4 sm:min-h-[395px] md:min-h-[168px]'>
      <div className='relative md:w-[320px] w-full md:max-w-[320px] md:min-w-[320px] md:pt-0 pt-[66.6%]'>
        <div className='absolute top-0 right-0 bottom-0 left-0'>
          <Image
            src='/dumb_image.jpeg'
            alt='image placeholder'
            className='w-full h-full object-cover object-center'
            fill
          />
        </div>
      </div>
      <div className='flex flex-col justify-between min-h-[180px]'>
        <div>
          <h4 className='mb-1'>{title}</h4>
          <div className='flex gap-2 mb-2 flex-wrap'>
            {categories.map(cat => (
              <div
                key={cat.id}
                className='bg-primary-default px-3 py-1 rounded-full text-white text-xs'
              >
                {cat.name}
              </div>
            ))}
          </div>
          <div className='flex gap-2 text-gray-400 items-center mb-2'>
            <span className='text-sm'>{author.username}</span>
            <div className='w-[4px] h-[4px] bg-gray-400 rounded-full' />
            <span className='text-sm'>
              <LocalizedDate date={createdAt} isRaw />
            </span>
          </div>
          <div>
            <span className='line-clamp-2'>{perex}</span>
          </div>
        </div>

        <Link href={`/posts/${id}`} className='text-sm text-primary-default underline'>
          Read more
        </Link>
      </div>
    </div>
  )
}

export default Card
