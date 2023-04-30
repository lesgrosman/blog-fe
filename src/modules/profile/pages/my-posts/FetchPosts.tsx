import { Category } from '@/utils/types'
import { useGeMyPosts } from '../../fetchers'
import React from 'react'

export type PostRow = {
  title: string
  perex: string
  author: string
  categories: Category[]
}

const FetchPosts = () => {
  const { data, isLoading, error } = useGeMyPosts()

  if (!data) return null

  return <h2>Table</h2>
}

export default FetchPosts
