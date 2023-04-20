import * as yup from 'yup'
import { SelectOption } from '@/components/Form/SelectInput'

export type PostForm = {
  title: string
  perex: string
  content: string
  categories: SelectOption[]
}

export const createPostDefaultValues: PostForm = {
  title: '',
  perex: '',
  content: '',
  categories: [],
}

export const createPostSchema = yup.object({
  title: yup.string().required('Title is required'),
  perex: yup.string().required('Perex is required'),
  content: yup.string().required('Content is required'),
})
