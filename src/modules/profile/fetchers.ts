import { AxiosCustomError, Category, MyPostsResponse, Post, PostDetail } from '@/utils/types'
import { PostForm } from './utils'
import { UseMutationResult, useMutation, useQuery } from '@tanstack/react-query'
import { useAxiosAuth } from '@/providers/axios'
import axios from 'axios'

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/categories`)
  return data
}

type UseCreatePost = ({
  onSuccess,
}: {
  onSuccess: () => void
}) => UseMutationResult<Post, AxiosCustomError, PostForm, unknown>

export const useCreatePost: UseCreatePost = ({ onSuccess }) => {
  const customAxios = useAxiosAuth()

  return useMutation<Post, AxiosCustomError, PostForm>(
    async (post: PostForm) => {
      const { data } = await customAxios.post<Post>(`${process.env.NEXT_PUBLIC_API}/posts`, {
        ...post,
        categories: post.categories.map(cat => ({
          id: cat.id,
          slug: cat.value,
          name: cat.label,
        })),
      })

      return data
    },
    {
      onSuccess,
    }
  )
}

type UpdateFormVariables = {
  post: PostForm
  id: string
}

type UseUpdatePost = ({
  onSuccess,
}: {
  onSuccess: () => void
}) => UseMutationResult<Post, AxiosCustomError, UpdateFormVariables, unknown>

export const useUpdatePost: UseUpdatePost = ({ onSuccess }) => {
  const customAxios = useAxiosAuth()

  return useMutation<Post, AxiosCustomError, UpdateFormVariables>(
    async ({ post, id }) => {
      const { data } = await customAxios.patch<Post>(`${process.env.NEXT_PUBLIC_API}/posts/${id}`, {
        ...post,
        categories: post.categories.map(cat => ({
          id: cat.id,
          slug: cat.value,
          name: cat.label,
        })),
      })

      return data
    },
    {
      onSuccess,
    }
  )
}

export const useGetPostById = (id: string) => {
  const customAxios = useAxiosAuth()

  return useQuery<PostDetail, AxiosCustomError>([id], async () => {
    const { data } = await customAxios.get<PostDetail>(`${process.env.NEXT_PUBLIC_API}/posts/${id}`)

    return data
  })
}

export const useGeMyPosts = () => {
  const customAxios = useAxiosAuth()

  return useQuery<MyPostsResponse, AxiosCustomError>(['My-posts'], async () => {
    const { data } = await customAxios.get<MyPostsResponse>(
      `${process.env.NEXT_PUBLIC_API}/posts/my-posts`,
      {
        params: {
          limit: 10,
        },
      }
    )

    return data
  })
}

type UseDeletePost = ({
  onSuccess,
}: {
  onSuccess: () => void
}) => UseMutationResult<{ id: string }, AxiosCustomError, string, unknown>

export const useDeletePost: UseDeletePost = ({ onSuccess }) => {
  const customAxios = useAxiosAuth()

  return useMutation<{ id: string }, AxiosCustomError, string>(
    async (id: string) => {
      const { data } = await customAxios.delete<{ id: string }>(
        `${process.env.NEXT_PUBLIC_API}/posts/${id}`
      )
      return data
    },
    {
      onSuccess,
    }
  )
}
