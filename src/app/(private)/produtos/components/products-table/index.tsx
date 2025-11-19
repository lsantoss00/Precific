"use client";

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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteProduct } from "../../services/delete-product";
import { getProducts } from "../../services/get-products";
import { updateProductStatus } from "../../services/update-product-status";
import { ProductResponseType } from "../../types/product-type";
import { productsTableColumns } from "./products-table-columns";
import { ProductsTablePagination } from "./products-table-pagination";

const ProductsTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("filtro") || "";
  const page = Number(searchParams.get("pagina")) || 1;

  const pageSize = 10;

  const [products, setProducts] = useState<ProductResponseType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [_, setTotalCount] = useState(0);

  const { data, isFetching } = useQuery({
    queryFn: () => getProducts({ page, pageSize, search }),
    queryKey: ["products", page, pageSize, search],
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
              : product
          )
        );
        await queryClient?.invalidateQueries({
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

  const { mutate: del, isPending: pendingDeleteProduct } = useMutation({
    mutationFn: deleteProduct,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousProducts = products;

      setProducts((prev) =>
        prev.filter((product) => product.id !== variables.productId)
      );

      return { previousProducts };
    },

    onSuccess: async () => {
      await queryClient?.invalidateQueries({ queryKey: ["product-summaries"] });
      toast.success("Produto deletado com sucesso!", {
        className: "!bg-green-600 !text-white",
      });
    },

    onError: (error, variables, context) => {
      if (context?.previousProducts) {
        setProducts(context.previousProducts);
      }

      toast.error(error.message, {
        className: "!bg-red-600 !text-white",
      });
    },
  });

  const table = useReactTable({
    data: products,
    columns: productsTableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      onDeleteProduct: (productId: string) => del({ productId }),
      pendingDeleteProduct: pendingDeleteProduct,
      onPriceProduct: (productId: string) =>
        router.push(`/produtos/${productId}`),
      onUpdateProductStatus: (productId: string, status: string) =>
        updateStatus({ productId, status }),
      pendingUpdateProductStatus: pendingUpdateProductStatus,
    },
  });

  useEffect(() => {
    if (data?.data) {
      setProducts(data.data);
    }
    if (data?.totalPages !== undefined) {
      setTotalPages(data.totalPages);
    }
    if (data?.count !== undefined) {
      setTotalCount(data.count);
    }
  }, [data]);

  return (
    <Column className="bg-white shadow-sm rounded-md flex flex-col relative !h-[630.5px]">
      <div className="flex-1 overflow-y-auto overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:!bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-gray-400">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <Show
              when={!isFetching && table.getRowModel().rows?.length}
              fallback={
                <TableRow className="hover:!bg-transparent">
                  <TableCell
                    colSpan={productsTableColumns.length}
                    className="h-24 text-center text-gray-500"
                  >
                    {isFetching ? (
                      <Row className="justify-center items-center gap-2">
                        <Loader2 className="text-[#66289B] animate-spin" />
                        <span>Carregando produtos...</span>
                      </Row>
                    ) : (
                      "Sem resultados."
                    )}
                  </TableCell>
                </TableRow>
              }
            >
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </Show>
          </TableBody>
        </Table>
      </div>
      <ProductsTablePagination currentPage={page} totalPages={totalPages} />
    </Column>
  );
};

export default ProductsTable;
