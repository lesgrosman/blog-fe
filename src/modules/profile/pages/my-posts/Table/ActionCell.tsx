import { CellContext } from '@tanstack/react-table'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { TableRow } from '../types'
import Link from 'next/link'
import React from 'react'

interface Props {
  cell: CellContext<TableRow, any>
}

const ActionCell = ({ cell }: Props) => {
  const { id } = cell.row.original

  return (
    <div className='flex gap-4'>
      <Link href={`post/${id}`}>
        <PencilSquareIcon className='h-5 w-5 hover:text-primary-default' aria-hidden='true' />
      </Link>
      <button>
        <TrashIcon className='h-5 w-5 hover:text-error' aria-hidden='true' />
      </button>
    </div>
  )
}

export default ActionCell
