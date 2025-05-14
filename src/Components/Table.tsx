import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { IApi, Iitems } from "../api";
import { useState } from "react";

interface TableProps {
  data : IApi
}

function Table({data}: TableProps) {
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
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
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
