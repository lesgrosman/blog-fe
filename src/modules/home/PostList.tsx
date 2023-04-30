import { PostItem } from '@/utils/types'
import Card from './Card'
import React from 'react'

interface Props {
  data: PostItem[]
}

const PostList = ({ data }: Props) => {
  return (
    <div className='grid grid-cols-12'>
      <section className='lg:col-span-9 col-span-12 flex md:flex-col flex-row sm:flex-nowrap flex-wrap gap-6'>
        {data.map(post => (
          <Card key={post.id} post={post} />
        ))}
      </section>
    </div>
  )
}

export default PostList
