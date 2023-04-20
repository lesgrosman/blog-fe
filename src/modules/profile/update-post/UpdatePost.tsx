import { useGetPostById } from '../fetchers'
import { useRouter } from 'next/router'
import Form from './Form'

const UpdatePost = () => {
  const router = useRouter()

  const { id } = router.query

  const { data, isLoading, error } = useGetPostById(id as string)

  if (isLoading) return <h2>Loading</h2>

  if (error || !data) return <span>{error?.response?.data.message}</span>

  return <Form post={data} />
}

export default UpdatePost
