/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
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
      header: 'Date',
      accessorKey: 'date',
      cell: (info) => {
        return dateConverter(info.getValue());
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main>
      <table className="text-sm sm:text-sm md:text-base lg:text-base border-collapse border-spacing-0 w-full border-gray-hover border-solid border-b-4">
        <thead className="bg-gray-hover text-white">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-left p-3">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="even:bg-[#f3f3f3]">
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
    </main>
  );
}

export default FileTableComponent;
