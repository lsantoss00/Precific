"use client";

import { Button, Switch } from "@/src/components/core";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import currencyFormatter from "@/src/helpers/currency-formatter";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2Icon, Tag, Trash2 } from "lucide-react";
import Link from "next/link";
import SortableHeader from "../../../../../components/core/sortable-header";
import { ProductResponseType } from "../../types/product-type";

interface ProductTableMeta {
  onDeleteProduct: (id: string) => void;
  pendingDeleteProduct: boolean;
  onUpdateProductStatus: (id: string, status: string) => void;
  pendingUpdateProductStatus: boolean;
}

export const productsTableColumns: ColumnDef<Partial<ProductResponseType>>[] = [
  {
    id: "sku",
    accessorKey: "sku",
    header: ({ column }) => (
      <div className="w-[80px] sm:w-[100px]">
        <SortableHeader column={column}>SKU</SortableHeader>
      </div>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-[80px] sm:w-[100px]">
        {row.getValue("sku")}
      </div>
    ),
    meta: {
      className: "table-cell",
    },
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <div className="w-[200px] lg:w-[300px]">
        <SortableHeader column={column}>NOME</SortableHeader>
      </div>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-[200px] lg:w-[300px]">
        {row.getValue("name")}
      </div>
    ),
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    id: "ncm",
    accessorKey: "ncm",
    header: ({ column }) => (
      <div className="w-[120px]">
        <SortableHeader column={column}>NCM</SortableHeader>
      </div>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-[120px]">
        {row.getValue("ncm")}
      </div>
    ),
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    id: "price_today",
    accessorKey: "price_today",
    header: ({ column }) => (
      <div className="w-[110px]">
        <SortableHeader column={column}>HOJE (R$)</SortableHeader>
      </div>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-[110px]">
        {currencyFormatter(row.getValue("price_today"))}
      </div>
    ),
    meta: {
      className: "hidden lg:table-cell",
    },
  },
  {
    id: "price_in_2026",
    accessorKey: "price_in_2026",
    header: ({ column }) => (
      <div className="w-[110px]">
        <SortableHeader column={column}>2026 (R$)</SortableHeader>
      </div>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-[110px]">
        {currencyFormatter(row.getValue("price_in_2026"))}
      </div>
    ),
    meta: {
      className: "hidden 2xl:table-cell",
    },
  },
  {
    id: "price_in_2027",
    accessorKey: "price_in_2027",
    header: ({ column }) => (
      <div className="w-[110px]">
        <SortableHeader column={column}>2027 (R$)</SortableHeader>
      </div>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-[110px]">
        {currencyFormatter(row.getValue("price_in_2027"))}
      </div>
    ),
    meta: {
      className: "hidden 2xl:table-cell",
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <div className="w-[80px]">
        <SortableHeader column={column}>STATUS</SortableHeader>
      </div>
    ),
    cell: ({ row, table }) => {
      const meta = table.options.meta as ProductTableMeta;
      const product = row.original;
      const isActive = row.getValue("status") === "ACTIVE";

      return (
        <div className="flex items-center">
          <Switch
            checked={isActive}
            onCheckedChange={(checked) => {
              meta?.onUpdateProductStatus?.(
                product.id!,
                checked ? "ACTIVE" : "INACTIVE"
              );
            }}
            disabled={
              meta?.pendingUpdateProductStatus || meta?.pendingDeleteProduct
            }
          />
        </div>
      );
    },
    meta: {
      className: "hidden 2xl:table-cell",
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="w-[120px] sm:w-[150px]" />,
    cell: ({ row, table }) => {
      const meta = table.options.meta as ProductTableMeta;
      const product = row.original;

      return (
        <Row className="justify-end space-x-2">
          <Button
            asChild
            variant="secondary"
            className="w-9 sm:w-fit"
            disabled={
              meta?.pendingUpdateProductStatus || meta?.pendingDeleteProduct
            }
          >
            <Link href={`/produtos/${product.id}`}>
              <Tag className="sm:hidden" />
              <span className="hidden sm:inline-flex sm:size-auto items-center gap-2">
                <Tag /> Precificar
              </span>
            </Link>
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => meta?.onDeleteProduct(product.id!)}
            disabled={
              meta?.pendingUpdateProductStatus || meta?.pendingDeleteProduct
            }
          >
            <Show
              when={!meta?.pendingDeleteProduct}
              fallback={<Loader2Icon className="animate-spin" />}
            >
              <Trash2 className="w-4 h-4" />
            </Show>
          </Button>
        </Row>
      );
    },
    meta: {
      className: "table-cell",
    },
  },
];
