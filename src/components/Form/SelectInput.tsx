import { useController, useFormContext } from 'react-hook-form'
import { useId } from 'react'
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select'

export type SelectOption = {
  id: string
  label: string
  value: string
}

export interface Props<Option> {
  name: string
  options: Option[]
  isMulti?: boolean
}

const SelectInput = <Option,>({ name, options, isMulti }: Props<Option>) => {
  const { control } = useFormContext()
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const handleChange = (
    newValue: SingleValue<Option> | MultiValue<Option>,
    _actionMeta: ActionMeta<Option>
  ) => {
    onChange(newValue)
  }
  return (
    <div className='relative flex flex-col gap-2'>
      <span>Choose categories</span>
      <Select
        instanceId={useId()}
        value={value}
        name={name}
        isMulti={isMulti}
        options={options}
        onChange={handleChange}
      />
      <span className='absolute -bottom-5 right-0 text-end text-sm text-error'>
        {error?.message}
      </span>
    </div>
  )
}

export default SelectInput
