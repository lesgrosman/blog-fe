import { useGetPostById } from '../../fetchers'
import { useRouter } from 'next/router'
import Logic from './Logic'

const UpdatePost = () => {
  const router = useRouter()

  const { id } = router.query

  const { data, isLoading, error } = useGetPostById(id as string)

  if (isLoading) return <h2>Loading</h2>

  if (error || !data) return <span>{error?.response?.data.message}</span>

  return <Logic post={data} />
}

export default UpdatePost
