"use client";

import ConfirmDeleteProductDialog from "@/src/app/(private)/produtos/components/products-table/confirm-delete-product-dialog";
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
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useAuth } from "@/src/providers/auth-provider";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getProducts } from "../../services/get-products";
import { updateProductStatus } from "../../services/update-product-status";
import { ProductResponseType } from "../../types/product-type";
import { productsTableColumns } from "./products-table-columns";
import { ProductsTablePagination } from "./products-table-pagination";

const ProductsTable = () => {
  const { company } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("filtro") || "";
  const page = Number(searchParams.get("pagina")) || 1;
  const sortBy = searchParams.get("ordenar") || "created_at";
  const sortOrder = (searchParams.get("ordem") as "asc" | "desc") || "desc";

  const pageSize = 10;

  const pricedProductsQuantity = company?.pricedProductsQuantity;

  const [products, setProducts] = useState<ProductResponseType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [_, setTotalCount] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([
    { id: sortBy, desc: sortOrder === "desc" },
  ]);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] =
    useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<{
    productId: string;
    productName: string;
  } | null>(null);

  const { data, isPending } = useQuery({
    queryFn: () => getProducts({ page, pageSize, search, sortBy, sortOrder }),
    queryKey: ["products", page, pageSize, search, sortBy, sortOrder],
  });

  const { mutate: updateStatus, isPending: pendingUpdateProductStatus } =
    useMutation({
      mutationFn: updateProductStatus,
      onSuccess: async (_, variables) => {
        setProducts((prev) =>
          prev.map((product) =>
            product.id === variables.productId
              ? {
                  ...product,
                  status: variables.status as "ACTIVE" | "INACTIVE",
                }
              : product,
          ),
        );
        await queryClient.invalidateQueries({
          queryKey: ["product-summaries"],
        });
        toast.success(`Status atualizado com sucesso!`, {
          className: "!bg-green-600 !text-white",
        });
      },
      onError: (error) => {
        toast.error(error.message, {
          className: "!bg-red-600 !text-white",
        });
      },
    });

  const table = useReactTable({
    data: products,
    columns: productsTableColumns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    state: {
      sorting,
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);

      const params = new URLSearchParams(searchParams.toString());
      if (newSorting.length > 0) {
        params.set("ordenar", newSorting[0].id);
        params.set("ordem", newSorting[0].desc ? "desc" : "asc");
      } else {
        params.delete("ordenar");
        params.delete("ordem");
      }
      params.set("pagina", "1");

      router.push(`?${params.toString()}`);
    },
    meta: {
      onDeleteProduct: (productId: string, productName: string) => {
        setProductToDelete({ productId, productName });
        setOpenConfirmDeleteDialog(true);
      },
      onPriceProduct: (productId: string) =>
        router.push(`/produtos/${productId}`),
      onUpdateProductStatus: (productId: string, productStatus: string) =>
        updateStatus({ productId, status: productStatus }),
      pendingUpdateProductStatus,
      pricedProductsQuantity,
    },
  });

  const handleOnOpenChange = () => {
    setOpenConfirmDeleteDialog(false);
    setProductToDelete(null);
  };

  useEffect(() => {
    if (data?.data) setProducts(data.data);
    if (data?.totalPages !== undefined) setTotalPages(data.totalPages);
    if (data?.count !== undefined) setTotalCount(data.count);
  }, [data]);

  useEffect(() => {
    if (
      !isPending &&
      data?.data &&
      data.data.length === 0 &&
      page > 1 &&
      totalPages > 0
    ) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("pagina", String(page - 1));
      router.push(`?${params.toString()}`);
    }
  }, [data, isPending, page, totalPages, searchParams, router]);

  useEffect(() => {
    setSorting([{ id: sortBy, desc: sortOrder === "desc" }]);
  }, [sortBy, sortOrder]);

  const hasData = !isPending && table.getRowModel().rows?.length > 0;

  return (
    <Column className="bg-white shadow-sm flex flex-col h-160.5! overflow-hidden rounded-md">
      <div className="flex-1 overflow-hidden">
        <Table className="w-full table-fixed">
          <TableHeader className="sticky top-0 z-10 shadow-sm h-14">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent!">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.column.columnDef.size }}
                    className={`text-gray-400 ${
                      header.column.columnDef.meta?.className ?? ""
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <Show
              when={hasData}
              fallback={
                <TableRow className="hover:bg-transparent!">
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-130 text-center text-gray-500"
                  >
                    <div className="flex items-center justify-center h-full">
                      <Show
                        when={isPending}
                        fallback={<span>Sem resultados.</span>}
                      >
                        <Row className="justify-center items-center gap-2">
                          <Loader2 className="text-primary animate-spin" />
                          <span>Carregando produtos...</span>
                        </Row>
                      </Show>
                    </div>
                  </TableCell>
                </TableRow>
              }
            >
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.columnDef.size }}
                      className={`px-4 ${
                        cell.column.columnDef.meta?.className ?? ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </Show>
          </TableBody>
        </Table>
      </div>
      <Row className="bg-neutral-50 border-t h-14 md:pr-3">
        <ProductsTablePagination currentPage={page} totalPages={totalPages} />
      </Row>
      <ConfirmDeleteProductDialog
        product={productToDelete!}
        open={openConfirmDeleteDialog}
        onOpenChange={handleOnOpenChange}
      />
    </Column>
  );
};

export default ProductsTable;
