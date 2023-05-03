import { Category } from '@/utils/types'
import { Table } from './Table/Table'
import { TableRow } from './types'
import { createColumnHelper } from '@tanstack/react-table'
import { useGeMyPosts } from '../../fetchers'
import ActionCell from './Table/ActionCell'
import CategoryCell from './Table/CategoryCell'
import LocalizedDate from '@/utils/components/LocalizedDate'
import React from 'react'

export type PostRow = {
  title: string
  perex: string
  author: string
  categories: Category[]
}

const FetchPosts = () => {
  const { data, isLoading } = useGeMyPosts()

  if (isLoading) return <h2>loading...</h2>

  if (!data) return null

  const columnHelper = createColumnHelper<TableRow>()

  const columns = [
    columnHelper.accessor('title', {
      id: 'title',
      header: () => 'Title',
      cell: cell => cell.getValue(),
    }),
    columnHelper.accessor('perex', {
      id: 'perex',
      header: () => 'Perex',
      cell: cell => <span className='line-clamp-2 text-sm'>{cell.getValue()}</span>,
    }),
    columnHelper.accessor('author', {
      id: 'author',
      header: () => 'Author',
      cell: cell => cell.getValue(),
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: () => 'Created at',
      cell: cell => <LocalizedDate date={cell.getValue()} isRaw />,
    }),
    columnHelper.accessor('categories', {
      id: 'categories',
      header: () => 'Categories',
      cell: cell => <CategoryCell cell={cell} />,
      enableSorting: false,
    }),
    columnHelper.display({
      id: 'actions',
      header: () => 'Actions',
      cell: cell => <ActionCell cell={cell} />,
    }),
  ]

  const tableData: TableRow[] = data.posts.map(post => ({
    id: post.id,
    title: post.title,
    perex: post.perex,
    author: post.author.username,
    createdAt: post.createdAt,
    categories: post.categories,
  }))

  return <Table data={tableData} columns={columns} />
}

export default FetchPosts
