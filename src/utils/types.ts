import { AxiosError } from 'axios'

export type AxiosCustomError = AxiosError<Record<string, string>>

export type User = {
  id: string
  username: string
  firstName: string
  lastName: string
  createdAt: string
}

export type Category = {
  id: string
  name: string
  slug: string
}

export type Post = {
  id: string
  title: string
  perex: string
  content: string
  slug: string
  authorId: string
  createdAt: Date
  updatedAt: Date
}

export type PostDetail = Post & {
  categories: Category[]
  author: User
}
