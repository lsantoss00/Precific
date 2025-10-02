"use client";

import { Button } from "@/src/components/core";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2Icon, Trash2 } from "lucide-react";

export type Product = {
  id: string;
  sku: string;
  productName: string;
  ncm: string;
  priceToday: number;
  priceIn2026: number;
  priceIn2027: number;
  isDeleting?: boolean;
};

interface ProductTableMeta {
  onDelete: (id: string) => void;
  onPrice: (id: string) => void;
}

export const productsTableColumns: ColumnDef<Product>[] = [
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
    accessorKey: "productName",
    header: "NOME",
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {row.getValue("productName")}
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
    accessorKey: "priceToday",
    header: "HOJE (R$)",
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {row.getValue("priceToday")}
      </div>
    ),
  },
  {
    accessorKey: "priceIn2026",
    header: "2026 (R$)",
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {row.getValue("priceIn2026")}
      </div>
    ),
  },
  {
    accessorKey: "priceIn2027",
    header: "2027 (R$)",
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {row.getValue("priceIn2027")}
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
          <Button onClick={() => meta?.onPrice(product.id)}>Precificar</Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => meta?.onDelete(product.id)}
            disabled={product.isDeleting}
          >
            <Show
              when={!product.isDeleting}
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

export type { ProductTableMeta };
