import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { useController, useFormContext } from 'react-hook-form'

export type SelectOption = {
  id: string
  name: string
  value: string
}

interface Props {
  label: string
  options: SelectOption[]
  name: string
}

const MultiSelect = ({ label, options, name }: Props) => {
  const { control } = useFormContext()
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  })

  const handleChange = (values: SelectOption[]) => {
    onChange(values)
  }

  const handleDelete = (id: string) => {
    const newState = value.filter((option: SelectOption) => option.id !== id)
    onChange(newState)
  }

  const visibleOptions = options.filter(
    option => !(value as SelectOption[]).map(item => item.id).includes(option.id)
  )

  return (
    <div className='relative flex flex-col gap-2'>
      <span>{label}</span>
      <Listbox value={value} onChange={handleChange} multiple>
        <div className='relative mt-1'>
          <Listbox.Button className='flex min-h-[34px] relative w-full gap-1 cursor-pointer border-gray-400 border-1 rounded-lg bg-white py-1 pl-3 pr-10 text-left sm:text-sm flex-wrap'>
            {value.map((category: SelectOption) => (
              <span
                key={category.id}
                onClick={e => {
                  e.stopPropagation()
                  handleDelete(category.id)
                }}
                className='flex gap-2 items-center truncate bg-gray-200 mr-2 rounded-md px-2 py-[2px] cursor-pointer text-sm'
              >
                {category.name}
                <XMarkIcon className='h-5 w-5' />
              </span>
            ))}
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </span>
          </Listbox.Button>
          {options.length !== value.length && (
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10'>
                {visibleOptions.map((option, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-2 pr-4 ${
                        active ? 'bg-sky-300 text-blue-900' : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {option.name}
                        </span>
                        {selected ? (
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          )}
        </div>
      </Listbox>
    </div>
  )
}

export default MultiSelect
