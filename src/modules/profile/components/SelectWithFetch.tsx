import { Category } from '@/utils/types'
import { getCategories } from '../fetchers'
import { useQuery } from '@tanstack/react-query'
import SelectInput from '@/components/Form/SelectInput'

const SelectWithFetch = () => {
  const { data } = useQuery<Category[]>(['Categories'], getCategories)

  const options = data?.map(category => ({
    id: category.id,
    value: category.slug,
    label: category.name,
  }))

  return <SelectInput name='categories' isMulti options={options || []} />
}

export default SelectWithFetch
