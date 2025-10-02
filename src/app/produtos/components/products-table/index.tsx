"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/core";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { Product, productsTableColumns } from "./products-table-columns";

const ProductsTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data: mockProducts,
    columns: productsTableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <Table className="overflow-hidden w-full rounded-md border bg-white">
      <TableHeader>
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
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={productsTableColumns.length}
              className="h-24 text-center"
            >
              Sem resultados.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;

export const mockProducts: Product[] = [
  {
    id: "1",
    sku: "ABC123",
    productName: "Cimento Portland",
    ncm: "2523.29.10",
    priceToday: 28.5,
    priceIn2026: 32.9,
    priceIn2027: 35.1,
    isDeleting: false,
  },
  {
    id: "2",
    sku: "XYZ987",
    productName: "Aço Longo CA-50",
    ncm: "7214.20.00",
    priceToday: 4500,
    priceIn2026: 4890,
    priceIn2027: 5100,
    isDeleting: false,
  },
  {
    id: "3",
    sku: "LMN456",
    productName: "Tinta Acrílica Premium",
    ncm: "3209.10.10",
    priceToday: 210,
    priceIn2026: 239,
    priceIn2027: 255,
    isDeleting: false,
  },
  {
    id: "4",
    sku: "QWE741",
    productName: "Cabo Elétrico 2,5mm",
    ncm: "8544.49.00",
    priceToday: 180,
    priceIn2026: 199,
    priceIn2027: 210,
    isDeleting: false,
  },
  {
    id: "5",
    sku: "RTY852",
    productName: "Caixa de Ferramentas",
    ncm: "7326.90.90",
    priceToday: 320,
    priceIn2026: 350,
    priceIn2027: 370,
    isDeleting: false,
  },
];
