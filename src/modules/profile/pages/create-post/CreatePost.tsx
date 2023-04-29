import { FormProvider, useForm } from 'react-hook-form'
import { PostForm, createPostDefaultValues, createPostSchema } from '../../utils'
import { useCreatePost } from '../../fetchers'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/utils/auth/hooks/useUser'
import { yupResolver } from '@hookform/resolvers/yup'
import PostFormView from '../../forms/PostFormView'

const CreatePost = () => {
  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    if (!user) {
      router.push('/signin')
    }
  })

  const { mutate, isLoading, error } = useCreatePost({
    onSuccess: () => {
      methods.reset()
      router.push('/profile/my-posts')
    },
  })
  const methods = useForm<PostForm>({
    defaultValues: createPostDefaultValues,
    resolver: yupResolver(createPostSchema),
    mode: 'onSubmit',
  })

  const handleSubmit = methods.handleSubmit((data: PostForm) => {
    mutate(data)
  })

  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-9'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <PostFormView
              title='Create new post'
              submitLabel='Create'
              disabled={isLoading}
              error={error}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default CreatePost
