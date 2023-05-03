import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Table } from '@tanstack/react-table'
import { useMemo } from 'react'

interface Props<T extends object> {
  table: Table<T>
  count: number
}

const Pagination = <T extends object>({
  count,
  table: {
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    getState,
    setPageIndex,
    getPageCount,
    previousPage,
  },
}: Props<T>) => {
  const {
    pagination: { pageIndex },
  } = getState()

  const pageCount = useMemo(() => getPageCount(), [])

  const renderPageButtons = () => {
    const pageLinks = []

    for (let i = 1; i <= pageCount; i++) {
      const isActive = pageIndex === i - 1
      pageLinks.push(
        <button
          key={i}
          onClick={() => setPageIndex(i - 1)}
          className={`relative inline-flex items-center px-4 py-2 text-sm ${
            isActive ? 'bg-primary-default text-white' : 'text-gray-900'
          } ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
        >
          {i}
        </button>
      )
    }
    return pageLinks
  }

  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 sm:px-6'>
      <div className='flex flex-1 justify-between sm:hidden'></div>
      <div className='sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Total <span className='font-medium'>{count}</span> results
          </p>
        </div>
        <div>
          <nav
            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'
          >
            <button
              onClick={previousPage}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                getCanPreviousPage()
                  ? 'hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!getCanPreviousPage()}
            >
              <span className='sr-only'>Next</span>
              <ChevronLeftIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </button>
            {renderPageButtons()}
            <button
              onClick={nextPage}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                getCanNextPage()
                  ? 'hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!getCanNextPage()}
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
