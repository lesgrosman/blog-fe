import { Category } from '@/utils/types'
import { CellContext } from '@tanstack/react-table'
import { TableRow } from '../types'

interface Props {
  cell: CellContext<TableRow, Category[]>
}

const CategoryCell = ({ cell }: Props) => {
  return (
    <div className='flex gap-2 flex-wrap'>
      {cell.getValue().map(cat => (
        <span key={cat.id} className='text-sm bg-primary-default px-2 py-1 rounded-full text-white'>
          {cat.name}
        </span>
      ))}
    </div>
  )
}

export default CategoryCell
