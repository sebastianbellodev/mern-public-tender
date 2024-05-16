/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { dateConverter } from '../../tools/date.js';

function FileTableComponent({ data }) {
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Reference',
      accessorKey: 'reference',
    },
    {
      header: 'Operator',
      accessorFn: (row) => `${row.operator.name} ${row.operator.lastname}`,
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');

  const navigate = useNavigate();

  function handleClick(route) {
    navigate(route);
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const handleRowClick = (data) => {
    navigate(`/files/${data._id}`);
  };

  return (
    <main className="flex flex-col gap-3 w-full">
      <section className="flex gap-2 items-baseline justify-star">
        <article className="flex flex-col gap-2">
          <label htmlFor="search" className="font-semibold text-gray-333333">
            Filter
          </label>
          <input
            type="search"
            id="search"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            className="w-[30vw] p-2 border-2 rounded-sm border-gray-666666"
          />
        </article>
        <article className="flex gap-3 justify-end m-auto w-[80%]">
          <button
            onClick={() => handleClick('/files')}
            className="p-2 w-[18vw] sm:p-2 sm:w-[16vw] md:p-3 md:w-[12vw] lg:p-3 lg:w-[8vw] rounded-md font-bold bg-gray-333333 hover:bg-gray-666666 text-white"
          >
            Add
          </button>
        </article>
      </section>
      <table className="text-sm sm:text-sm md:text-base lg:text-base border-collapse border-spacing-0 border-gray-666666 border-solid border-b-4">
        <thead className="bg-gray-333333 text-white">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="text-left p-3"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      { asc: '⬆️', desc: '⬇️' }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className="even:bg-[#f3f3f3] cursor-pointer"
                onClick={() => handleRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="text-left p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <aside className="flex gap-1">
        <button
          onClick={() => table.setPageIndex(0)}
          className="p-2 w-[18vw] sm:p-2 sm:w-[16vw] md:p-3 md:w-[12vw] lg:p-3 lg:w-[8vw] rounded-md font-bold bg-gray-333333 hover:bg-gray-666666 text-white"
        >
          First
        </button>
        <button
          onClick={() => table.previousPage()}
          className="p-2 w-[24vw] sm:p-2 sm:w-[16vw] md:p-3 md:w-[12vw] lg:p-3 lg:w-[8vw] rounded-md font-bold bg-gray-333333 hover:bg-gray-666666 text-white"
        >
          Previous
        </button>
        <button
          onClick={() => (table.getCanNextPage() ? table.nextPage() : null)}
          className="p-2 w-[18vw] sm:p-2 sm:w-[16vw] md:p-3 md:w-[12vw] lg:p-3 lg:w-[8vw] rounded-md font-bold bg-gray-333333 hover:bg-gray-666666 text-white"
        >
          Next
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className="p-2 w-[18vw] sm:p-2 sm:w-[16vw] md:p-3 md:w-[12vw] lg:p-3 lg:w-[8vw] rounded-md font-bold bg-gray-333333 hover:bg-gray-666666 text-white"
        >
          Last
        </button>
      </aside>
    </main>
  );
}

export default FileTableComponent;
