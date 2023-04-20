import { FormProvider, useForm } from 'react-hook-form'
import { PostForm, createPostDefaultValues, createPostSchema } from '../utils'
import { useCreatePost } from '../fetchers'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import PostFormView from '../forms/PostFormView'

const CreatePost = () => {
  const router = useRouter()

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
    <div className='grid grid-cols-12 py-10'>
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
