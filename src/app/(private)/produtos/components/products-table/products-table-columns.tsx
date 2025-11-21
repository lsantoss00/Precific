"use client";

import { Button, Switch } from "@/src/components/core";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import currencyFormatter from "@/src/helpers/currency-formatter";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2Icon, Trash2 } from "lucide-react";
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
      <SortableHeader column={column}>SKU</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate">{row.getValue("sku")}</div>
    ),
    meta: {
      className: "table-cell",
    },
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>NOME</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate">{row.getValue("name")}</div>
    ),
    meta: {
      className: "hidden sm:table-cell",
    },
  },
  {
    id: "ncm",
    accessorKey: "ncm",
    header: ({ column }) => (
      <SortableHeader column={column}>NCM</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate">{row.getValue("ncm")}</div>
    ),
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    id: "price_today",
    accessorKey: "price_today",
    header: ({ column }) => (
      <SortableHeader column={column}>HOJE (R$)</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="truncate uppercase">
        {currencyFormatter(row.getValue("price_today"))}
      </div>
    ),
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    id: "price_in_2026",
    accessorKey: "price_in_2026",
    header: ({ column }) => (
      <SortableHeader column={column}>2026 (R$)</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="truncate uppercase">
        {currencyFormatter(row.getValue("price_in_2026"))}
      </div>
    ),
    meta: {
      className: "hidden lg:table-cell",
    },
  },
  {
    id: "price_in_2027",
    accessorKey: "price_in_2027",
    header: ({ column }) => (
      <SortableHeader column={column}>2027 (R$)</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="truncate uppercase">
        {currencyFormatter(row.getValue("price_in_2027"))}
      </div>
    ),
    meta: {
      className: "hidden xl:table-cell",
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row, table }) => {
      const meta = table.options.meta as ProductTableMeta;
      const product = row.original;
      const isActive =
        row.getValue("status") === "ACTIVE" ||
        row.getValue("status") === "active";

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
      className: "hidden sm:table-cell",
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const meta = table.options.meta as ProductTableMeta;
      const product = row.original;

      return (
        <Row className="justify-end space-x-2">
          <Button
            asChild
            variant="secondary"
            disabled={
              meta?.pendingUpdateProductStatus || meta?.pendingDeleteProduct
            }
          >
            <Link href={`/produtos/${product.id}`}>Precificar</Link>
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
              <Trash2 />
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
