import { PostItem } from '@/utils/types'
import Card from './Card'
import React from 'react'

interface Props {
  data: PostItem[]
}

const PostList = ({ data }: Props) => {
  return (
    <div className='grid grid-cols-12'>
      <section className='grid grid-cols-12 lg:col-span-9 col-span-12 gap-6'>
        {data.map(post => (
          <div key={post.id} className='md:col-span-12 sm:col-span-6 col-span-12'>
            <Card post={post} />
          </div>
        ))}
      </section>
    </div>
  )
}

export default PostList
