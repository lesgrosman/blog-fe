import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Pagination from '@/components/Pagination'
import type { ColumnDef } from '@tanstack/react-table'

interface ReactTableProps<T extends object> {
  data: T[]
  columns: ColumnDef<T, any>[]
}

export const Table = <T extends object>({ data, columns }: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
  })

  return (
    <>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-4 sm:px-6 lg:px-8'>
            <div className='overflow-hidden p-2'>
              <table className='min-w-full text-center'>
                <thead className='border-b bg-gray-50'>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th
                          key={header.id}
                          className='text-start px-6 py-4 text-sm font-medium text-gray-900'
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className='border-b bg-white'>
                      {row.getVisibleCells().map(cell => (
                        <td
                          className='text-start px-6 py-4 text-sm font-light text-gray-900'
                          key={cell.id}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination count={data.length} table={table} />
    </>
  )
}
