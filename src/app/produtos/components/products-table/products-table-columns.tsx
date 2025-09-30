"use client";

import { Button } from "@/src/components/core";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { currencyFormatter } from "@/src/helpers/currency-formatter";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Loader2Icon, Trash2 } from "lucide-react";

export interface Product {
  id: string;
  amount: number;
  status: string;
  email: string;
  isDeleting?: boolean;
}

interface ProductTableMeta {
  onDelete: (id: string) => void;
  onPrice: (id: string) => void;
}

export const productsTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      return (
        <div className="text-right font-medium">
          {currencyFormatter(amount)}
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
