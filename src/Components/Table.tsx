import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { IApi, Iitems } from "../api";
import { useState } from "react";

interface TableProps {
  data: IApi;
  onRowHover: (fstName: string | null) => void;
}

function Table({ data, onRowHover }: TableProps) {
  if (!data) return;
  const items = data.response.body.items;
  const today = new Date().getTime();
  const filteredItems = items.filter((item) => {
    const fstStart = new Date(item.fstvlStartDate).getTime();
    const fstEnd = new Date(item.fstvlEndDate).getTime();
    return fstStart <= today && fstEnd >= today;
  });
  const defaultData: Iitems[] = [...filteredItems];
  const [tableData, setTableData] = useState(() => [...defaultData]);
  const columnHelper = createColumnHelper<Iitems>();
  const columns = [
    columnHelper.accessor("fstvlNm", {
      header: "축제명",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("fstvlStartDate", {
      header: "시작일",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("fstvlEndDate", {
      header: "종료일",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("insttNm", {
      header: "주최시",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative overflow-x-auto">
      <table
        className="w-full text-sm text-left text-spring bg-bg-spring"
        style={{ width: "100%" }}
      >
        <thead className="text-xl">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  scope="col"
                  className="px-6 py-3"
                  key={header.id}
                  style={{ width: `${header.getSize()}px` }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className=" border-b  border-gray-200 cursor-pointer"
              onMouseEnter={() => onRowHover(row.original.fstvlNm)}
              onMouseLeave={() => onRowHover(null)}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  className="px-6 py-3"
                  key={cell.id}
                  style={{ width: `${cell.column.getSize()}px` }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
