import { Category, User } from '@/utils/types'

export type PostItem = {
  id: string
  title: string
  perex: string
  slug: string
  authorId: string
  createdAt: Date
  updatedAt: Date
  categories: Category[]
  author: User
}
