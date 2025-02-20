import { createFetcher } from "@/lib/fetcher/fetcher";
import { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  VisibilityState,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTable } from "./data-table";
import { DataTablePagination } from "./data-table-pagination";
import { Widget } from "@/lib/graphql/__generated__/graphql";
import { Switch } from "@/components/ui/switch";
import { formatComplexValue, FormatOptions } from "@/lib/utils/data-formatter";

// 컬럼 타입 정의
export type DataTableColumnType =
  | "text"
  | "number"
  | "currency"
  | "date"
  | "toggle"
  | "custom";

export type DataTableColumn<T> = {
  id: string;
  accessorKey: keyof T;
  label: string;
  type: DataTableColumnType;
  format?: {
    type?: string;
    options?: FormatOptions & {
      currency?: string;
      renderer?: (value: any, row: T) => React.ReactNode;
    };
  };
};

// 위젯 props 타입 정의
export type DataTableWidgetProps<T> = {
  api: {
    url: string;
    method: string;
  };
  table: {
    columns: DataTableColumn<T>[];
    features: {
      sort?: boolean;
      filter?: boolean;
      pagination?: boolean;
      rowSelection?: boolean;
      columnVisibility?: boolean;
    };
    pagination?: {
      defaultPageSize?: number;
      pageSizeOptions?: number[];
    };
  };
  style?: {
    table?: React.CSSProperties;
    header?: React.CSSProperties;
    row?: React.CSSProperties;
    cell?: React.CSSProperties;
  };
};

export function DataTableWidget<T>({
  widget,
}: {
  widget: Widget & { props: DataTableWidgetProps<T> };
}) {
  const { props } = widget;
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 테이블 상태 관리
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const fetcher = createFetcher({
    url: props.api.url,
    method: props.api.method,
  });

  const fetchDataAndSetData = async () => {
    try {
      setLoading(true);
      const result = await fetcher({});
      if (result.success) {
        setData(result.data as T[]);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로딩
  useEffect(() => {
    fetchDataAndSetData();
  }, [props.api?.url]); // URL이 변경될 때마다 다시 로딩

  // 컬럼 정의 변환
  const columns = useMemo<ColumnDef<T>[]>(
    () =>
      props.table.columns.map((column) => ({
        id: column.id,
        accessorKey: column.accessorKey as string,
        header: column.label,
        cell: ({ row }) => {
          const value = row.getValue(column.accessorKey);

          switch (column.type) {
            case "currency":
              return new Intl.NumberFormat(column.format?.type || "ko-KR", {
                style: "currency",
                currency: column.format?.options?.currency || "KRW",
              }).format(value as number);

            case "date":
              return new Date(value).toLocaleDateString(
                column.format?.type || "ko-KR",
                column.format?.options
              );

            case "number":
              return new Intl.NumberFormat(
                column.format?.type || "ko-KR",
                column.format?.options
              ).format(value as number);

            case "toggle":
              return (
                <Switch
                  checked={value as boolean}
                  onCheckedChange={() => row.toggleSelected()}
                />
              );

            case "custom":
              return (
                column.format?.options?.renderer?.(value, row.original) ||
                formatComplexValue(value, column.format?.options)
              );

            default:
              return formatComplexValue(value, column.format?.options);
          }
        },
        enableSorting: props.table.features.sort,
        enableFiltering: props.table.features.filter,
      })),
    [props.table.columns]
  );

  // 테이블 인스턴스 생성
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: props.table.features.rowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: props.table.pagination?.defaultPageSize || 10,
      },
    },
  });

  // 에러 상태 표시
  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">에러</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 툴바 (필터, 컬럼 가시성 등) */}
      {(props.table.features.filter ||
        props.table.features.columnVisibility) && (
        <DataTableToolbar table={table} />
      )}

      {/* 테이블 */}
      <DataTable table={table} loading={loading} style={props.style} />

      {/* 페이지네이션 */}
      {props.table.features.pagination && (
        <DataTablePagination
          table={table}
          pageSizeOptions={
            props.table.pagination?.pageSizeOptions || [10, 20, 30, 40, 50]
          }
        />
      )}
    </div>
  );
}
