import { useController, useFormContext } from 'react-hook-form'
import React, { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  isError?: boolean
  errorMessage?: string
  removeErrors?: () => void
  commonError?: boolean
  innerClassName?: string
}

const TextInput = ({
  label,
  innerClassName = '',
  name,
  isError,
  errorMessage,
  removeErrors,
  commonError,
  ...rest
}: Props) => {
  const { control } = useFormContext()
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value)
    removeErrors && removeErrors()
  }

  return (
    <div className={`flex flex-col gap-2 ${innerClassName}`}>
      {label && <span className='text-black'>{label}</span>}
      <input
        {...rest}
        className='outline-primary-dark py-1 px-4 rounded-lg border-gray-400 border-1'
        type='text'
        value={value}
        onChange={handleChange}
      />
      {error ? (
        <span className='text-error text-sm'>{error.message}</span>
      ) : isError ? (
        <span className='text-error text-sm'>{errorMessage}</span>
      ) : commonError ? (
        <span className='text-error text-sm'>Something went wrong</span>
      ) : null}
    </div>
  )
}

export default TextInput
