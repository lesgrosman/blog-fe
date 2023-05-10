import { AxiosCustomError, Category } from '@/utils/types'
import { Controller, useFormContext } from 'react-hook-form'
import { getCategories } from '../fetchers'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import Button from '@/components/Button'
import MultiSelect, { SelectOption } from '@/components/Form/MultiSelect'
import TextArea from '@/components/Form/TextAreaInput'
import TextInput from '@/components/Form/TextInput'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface Props {
  title: string
  submitLabel: string
  disabled: boolean
  error: AxiosCustomError | null
}

const PostFormView = ({ title, submitLabel, disabled, error }: Props) => {
  const { data } = useQuery<Category[]>(['Categories'], getCategories)
  const { control } = useFormContext()

  const options: SelectOption[] = useMemo(() => {
    return data ? data.map(item => ({ id: item.id, name: item.name, value: item.slug })) : []
  }, [data])

  return (
    <>
      <div className='flex gap-8'>
        <h2>{title}</h2>
        <Button label={submitLabel} type='submit' disabled={disabled} />
      </div>
      {error && <span className='text-error text-start'>{error?.response?.data.message}</span>}
      <TextInput name='title' label='Post title' />
      <TextArea name='perex' label='Post perex' rows={4} />
      <MultiSelect name='categories' label='Choose categories' options={options} />
      <div className='flex flex-col gap-2'>
        <span>Article content</span>
        <Controller
          name='content'
          control={control}
          render={({ field }) => (
            <div className='w-full'>
              <ReactQuill
                value={field.value}
                placeholder='Your article text!'
                onChange={value => field.onChange(value)}
              />
            </div>
          )}
        />
      </div>
    </>
  )
}

export default PostFormView
