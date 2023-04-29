import { getAllPosts } from './fetchers'
import { useQuery } from '@tanstack/react-query'
import PostList from './PostList'

const Home = () => {
  const { data, isLoading, isError } = useQuery(['Posts'], getAllPosts)

  if (isLoading && !data) return <h2>Loading...</h2>

  if (isError || !data) return <h2>Error...</h2>

  return <PostList data={data} />
}

export default Home
