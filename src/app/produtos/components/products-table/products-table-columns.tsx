"use client";

import { Button } from "@/src/components/core";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { currencyFormatter } from "@/src/helpers/currency-formatter";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2Icon, Trash2 } from "lucide-react";
import { ProductResponseType } from "../../types/product-type";

interface ProductTableMeta {
  onDeleteProduct: (id: string) => void;
  pendingDeleteProduct: boolean;
  onPriceProduct: (id: string) => void;
}

export const productsTableColumns: ColumnDef<Partial<ProductResponseType>>[] = [
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => (
      <div className="uppercase truncate text-eltext-ellipsis">
        {row.getValue("sku")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "NOME",
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "ncm",
    header: "NCM",
    cell: ({ row }) => (
      <div className="uppercase truncate text-eltext-ellipsis">
        {row.getValue("ncm")}
      </div>
    ),
  },
  {
    accessorKey: "price_today",
    header: "HOJE (R$)",
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {currencyFormatter(row.getValue("price_today"))}
      </div>
    ),
  },
  {
    accessorKey: "price_in_2026",
    header: "2026 (R$)",
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {currencyFormatter(row.getValue("price_in_2026"))}
      </div>
    ),
  },
  {
    accessorKey: "price_in_2027",
    header: "2027 (R$)",
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {currencyFormatter(row.getValue("price_in_2027"))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {row.getValue("status")}
      </div>
    ),
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
          >
            Precificar
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => meta?.onDeleteProduct(product.id!)}
            disabled={meta?.pendingDeleteProduct}
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
