"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import TablePagination from "@/src/components/table-pagination";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { getProducts } from "../../services/get-products";
import { productsTableColumns } from "./products-table-columns";

const ProductsTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [page, setPage] = React.useState(1);
  const pageSize = 1;

  const { data, isPending: pendingProducts } = useQuery({
    queryFn: () => getProducts({ page, pageSize }),
    queryKey: ["products", page, pageSize],
  });

  const productsList = data?.data || [];

  const table = useReactTable({
    data: productsList,
    columns: productsTableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: data?.totalPages ?? 0,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <Column className="bg-white h-full shadow-sm rounded-md flex flex-col">
      <div className="flex-1 overflow-auto min-h-0">
        <Table className="w-full">
          <TableHeader className="sticky top-0 bg-white z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:!bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-gray-400">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <Show
              when={!pendingProducts}
              fallback={
                // TO-DO: Ajuster layout desse pending
                <TableRow>
                  <TableCell
                    colSpan={productsTableColumns.length}
                    className="h-24 w-full text-center flex flex-col items-center justify-center space-y-2"
                  >
                    Carregando...
                  </TableCell>
                </TableRow>
              }
            >
              <Show
                when={table.getRowModel().rows?.length}
                fallback={
                  <TableRow>
                    <TableCell
                      colSpan={productsTableColumns.length}
                      className="h-24 text-center"
                    >
                      Sem resultados.
                    </TableCell>
                  </TableRow>
                }
              >
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </Show>
            </Show>
          </TableBody>
        </Table>
      </div>
      <div className="border-t bg-white">
        <Row className="items-center justify-between w-full p-4">
          <span className="text-sm">
            Página {page} de {data?.totalPages || 0} - Total de{" "}
            {data?.count || 0} produtos
          </span>
          <TablePagination
            currentPage={page}
            totalPages={data?.totalPages || 0}
            onPageChange={setPage}
          />
        </Row>
      </div>
    </Column>
  );
};

export default ProductsTable;
