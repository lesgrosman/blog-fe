import { Category } from '@/utils/types'

export type TableRow = {
  id: string
  title: string
  perex: string
  author: string
  createdAt: Date
  categories: Category[]
}
