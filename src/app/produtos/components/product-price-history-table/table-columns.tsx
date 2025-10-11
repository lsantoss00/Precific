"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductResponseType } from "../../types/product-type";
import SortableHeader from "../products-table/sortable-header";

export const productsTableColumns: ColumnDef<Partial<ProductResponseType>>[] = [
  {
    accessorKey: "price_today",
    header: ({ column }) => (
      <SortableHeader column={column}>Preço Unitário</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {row.getValue("price_today")}
      </div>
    ),
  },
  {
    accessorKey: "price_in_2026",
    header: ({ column }) => (
      <SortableHeader column={column}>Preço em 2026</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {row.getValue("price_in_2026")}
      </div>
    ),
  },
  {
    accessorKey: "changed_at",
    header: ({ column }) => (
      <SortableHeader column={column}>Data</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {row.getValue("changed_at")}
      </div>
    ),
  },
];
