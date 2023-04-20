import { AxiosCustomError } from '@/utils/types'
import { Controller, useFormContext } from 'react-hook-form'
import Button from '@/components/Button'
import SelectWithFetch from '../SelectWithFetch'
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

const FormView = ({ title, submitLabel, disabled, error }: Props) => {
  const { control } = useFormContext()

  return (
    <>
      <div className='flex gap-8'>
        <h2>{title}</h2>
        <Button label={submitLabel} type='submit' disabled={disabled} />
      </div>
      {error && <span className='text-error text-start'>{error?.response?.data.message}</span>}
      <TextInput name='title' label='Post title' />
      <TextArea name='perex' label='Post perex' rows={4} />
      <SelectWithFetch />
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

export default FormView
