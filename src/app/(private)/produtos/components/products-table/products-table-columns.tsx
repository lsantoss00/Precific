"use client";

import { Button, Switch } from "@/src/components/core";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { currencyFormatter } from "@/src/helpers/currency-formatter";
import { useAuth } from "@/src/providers/auth-provider";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2Icon, Tag, Trash2 } from "lucide-react";
import Link from "next/link";
import SortableHeader from "../../../../../components/core/sortable-header";
import { ProductResponseType } from "../../types/product-type";

interface ProductTableMeta {
  onDeleteProduct: (productId: string, productName: string) => void;
  pendingDeleteProduct: boolean;
  onUpdateProductStatus: (productId: string, productStatus: string) => void;
  pendingUpdateProductStatus: boolean;
}

export const productsTableColumns: ColumnDef<Partial<ProductResponseType>>[] = [
  {
    id: "sku",
    accessorKey: "sku",
    size: 80,
    header: ({ column }) => (
      <SortableHeader column={column}>SKU</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-20 sm:w-25">
        {row.getValue("sku")}
      </div>
    ),
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    id: "name",
    accessorKey: "name",
    size: 200,
    header: ({ column }) => (
      <SortableHeader column={column}>NOME</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-full md:w-45 lg:w-62.5 xl:w-75 min-w-0">
        {row.getValue("name")}
      </div>
    ),
    meta: {
      className:
        "table-cell w-full max-w-[150px] md:max-w-[180px] lg:max-w-[250px] xl:max-w-[300px] truncate min-w-0",
    },
  },
  {
    id: "ncm",
    accessorKey: "ncm",
    size: 80,
    header: ({ column }) => (
      <SortableHeader column={column}>NCM</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {row.getValue("ncm")}
      </div>
    ),
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    id: "priceToday",
    accessorKey: "priceToday",
    size: 80,
    header: ({ column }) => (
      <SortableHeader column={column}>HOJE (R$)</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-20">
        {currencyFormatter(row.getValue<number>("priceToday") * 100)}
      </div>
    ),
    meta: {
      className: "hidden lg:table-cell",
    },
  },
  {
    id: "priceIn2026",
    accessorKey: "priceIn2026",
    size: 80,
    header: ({ column }) => (
      <SortableHeader column={column}>2026 (R$)</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-20">
        {currencyFormatter(row.getValue<number>("priceIn2026") * 100)}
      </div>
    ),
    meta: {
      className: "hidden 2xl:table-cell",
    },
  },
  {
    id: "priceIn2027",
    accessorKey: "priceIn2027",
    size: 80,
    header: ({ column }) => (
      <SortableHeader column={column}>2027 (R$)</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-20">
        {currencyFormatter(row.getValue<number>("priceIn2027") * 100)}
      </div>
    ),
    meta: {
      className: "hidden 2xl:table-cell",
    },
  },
  {
    id: "status",
    accessorKey: "status",
    size: 60,
    header: ({ column }) => (
      <SortableHeader column={column}>STATUS</SortableHeader>
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
                checked ? "ACTIVE" : "INACTIVE",
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
    size: 120,
    header: () => <div className="w-25 sm:w-30" />,
    cell: ({ row, table }) => {
      const meta = table.options.meta as ProductTableMeta;
      const product = row.original;
      const { isPremium } = useAuth();

      const cannotPriceProduct = !isPremium && (product?.priceToday ?? 0) > 0;

      const isDisabled =
        meta?.pendingUpdateProductStatus ||
        meta?.pendingDeleteProduct ||
        cannotPriceProduct;

      return (
        <Row className="justify-end space-x-2">
          {!cannotPriceProduct ? (
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
          ) : (
            <Button
              variant="secondary"
              className="w-9 sm:w-fit"
              disabled={true}
            >
              <Tag className="sm:hidden" />
              <span className="hidden sm:inline-flex sm:size-auto items-center gap-2">
                <Tag /> Precificar
              </span>
            </Button>
          )}

          <Button
            variant="destructive"
            size="icon"
            onClick={() => meta?.onDeleteProduct(product.id!, product.name!)}
            disabled={isDisabled}
            aria-label="Excluir produto"
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
