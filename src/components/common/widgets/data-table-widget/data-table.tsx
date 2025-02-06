// components/widgets/DataTableWidget/DataTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender, Table as TableInstance } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";

interface DataTableProps<T> {
  table: TableInstance<T>;
  loading: boolean;
  style?: {
    table?: React.CSSProperties;
    header?: React.CSSProperties;
    row?: React.CSSProperties;
    cell?: React.CSSProperties;
  };
}

export function DataTable<T>({ table, loading, style }: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-md border" style={style?.table}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} style={style?.header}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                style={style?.row}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} style={style?.cell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                데이터가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
