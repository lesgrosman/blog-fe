import { AxiosError } from 'axios'

export type AxiosCustomError = AxiosError<Record<string, string>>

export type Pagination = {
  limit: number
  offset: number
  count: number
}

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

export type MyPostsResponse = {
  posts: PostItem[]
  pagination: Pagination
}
