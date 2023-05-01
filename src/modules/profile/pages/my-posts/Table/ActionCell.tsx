import { CellContext } from '@tanstack/react-table'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { TableRow } from '../types'
import { useDeletePost } from '@/modules/profile/fetchers'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import Modal from '@/components/Modal'
import React, { useState } from 'react'

interface Props {
  cell: CellContext<TableRow, any>
}

const ActionCell = ({ cell }: Props) => {
  const queryClient = useQueryClient()
  const { id } = cell.row.original
  const [isOpen, setIsOpen] = useState(false)

  const { mutate } = useDeletePost({
    onSuccess: () => {
      setIsOpen(false)
      queryClient.invalidateQueries(['My-posts'])
      queryClient.invalidateQueries(['Posts'])
    },
  })

  const handleConfirm = () => mutate(id)

  return (
    <>
      <Modal
        title='Delete Post'
        content='Are you sure you want to delete post forever?'
        isDisabled={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
      <div className='flex gap-4'>
        <Link href={`post/${id}`}>
          <PencilSquareIcon className='h-5 w-5 hover:text-primary-default' aria-hidden='true' />
        </Link>
        <button onClick={() => setIsOpen(true)}>
          <TrashIcon className='h-5 w-5 hover:text-error' aria-hidden='true' />
        </button>
      </div>
    </>
  )
}

export default ActionCell
