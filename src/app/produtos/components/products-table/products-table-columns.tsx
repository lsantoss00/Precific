"use client";

import { Button, Switch } from "@/src/components/core";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import currencyFormatter from "@/src/helpers/currency-formatter";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2Icon, Trash2 } from "lucide-react";
import SortableHeader from "../../../../components/core/sortable-header";
import { ProductResponseType } from "../../types/product-type";

interface ProductTableMeta {
  onDeleteProduct: (id: string) => void;
  pendingDeleteProduct: boolean;
  onPriceProduct: (id: string) => void;
  onUpdateProductStatus: (id: string, status: string) => void;
  pendingUpdateProductStatus: boolean;
}

export const productsTableColumns: ColumnDef<Partial<ProductResponseType>>[] = [
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <SortableHeader column={column}>SKU</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {row.getValue("sku")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>NOME</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "ncm",
    header: ({ column }) => (
      <SortableHeader column={column}>NCM</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {row.getValue("ncm")}
      </div>
    ),
  },
  {
    accessorKey: "price_today",
    header: ({ column }) => (
      <SortableHeader column={column}>HOJE (R$)</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {currencyFormatter(row.getValue("price_today"))}
      </div>
    ),
  },
  {
    accessorKey: "price_in_2026",
    header: ({ column }) => (
      <SortableHeader column={column}>2026 (R$)</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {currencyFormatter(row.getValue("price_in_2026"))}
      </div>
    ),
  },
  {
    accessorKey: "price_in_2027",
    header: ({ column }) => (
      <SortableHeader column={column}>2027 (R$)</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {currencyFormatter(row.getValue("price_in_2027"))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row, table }) => {
      const meta = table.options.meta as ProductTableMeta;
      const product = row.original;
      // TO-DO: ARRUMAR ESSA DUPLICAÇÃO DESNECESSÁRIA
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
            variant="secondary"
            onClick={() => meta?.onPriceProduct(product.id!)}
            disabled={
              meta?.pendingUpdateProductStatus || meta?.pendingDeleteProduct
            }
          >
            Precificar
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
  },
];
