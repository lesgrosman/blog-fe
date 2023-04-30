import { PostItem } from '@/utils/types'
import axios from 'axios'

export const getAllPosts = async (): Promise<PostItem[]> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/posts`)
  return data
}
