import { FormProvider, useForm } from 'react-hook-form'
import { PostDetail } from '@/utils/types'
import { PostForm, createPostSchema } from '../../utils'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useUpdatePost } from '../../fetchers'
import { yupResolver } from '@hookform/resolvers/yup'
import PostFormView from '../../forms/PostFormView'

interface Props {
  post: PostDetail
}

const Logic = ({ post }: Props) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate, isLoading, error } = useUpdatePost({
    onSuccess: () => {
      router.push('/profile/my-posts'), queryClient.invalidateQueries([post.id])
    },
  })

  const methods = useForm<PostForm>({
    defaultValues: {
      title: post.title,
      perex: post.perex,
      content: post.content,
      categories: post.categories.map(cat => ({
        id: cat.id,
        value: cat.slug,
        name: cat.name,
      })),
    },
    resolver: yupResolver(createPostSchema),
    mode: 'onSubmit',
  })

  const handleSubmit = methods.handleSubmit((data: PostForm) => {
    mutate({ post: data, id: post.id })
  })

  return (
    <div className='grid grid-cols-12 py-10'>
      <div className='col-span-9'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <PostFormView
              title='Update your Post'
              submitLabel='Update'
              disabled={isLoading}
              error={error}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Logic
