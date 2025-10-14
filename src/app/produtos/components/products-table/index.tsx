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
import TablePagination from "@/src/components/table-pagination";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { deleteProduct } from "../../services/delete-product";
import { getProducts } from "../../services/get-products";
import { updateProductStatus } from "../../services/update-product-status";
import { ProductResponseType } from "../../types/product-type";
import ProductsTableSkeleton from "../skeletons/products-table-skeleton";
import { productsTableColumns } from "./products-table-columns";

const ProductsTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("pagina")) || 1;
  const search = searchParams.get("filtro") || "";
  const pageSize = 10;

  const { data, isPending: pendingProducts } = useQuery({
    queryFn: () => getProducts({ page, pageSize, search }),
    queryKey: ["products", page, pageSize, search],
  });

  const { mutate: updateStatus, isPending: pendingUpdateProductStatus } =
    useMutation({
      mutationFn: updateProductStatus,
      onSuccess: async (_, variables) => {
        queryClient?.setQueryData(
          ["products", page, pageSize, search],
          (oldData: any) => {
            if (!oldData) return oldData;

            return {
              ...oldData,
              data: oldData.data.map((product: ProductResponseType) =>
                product.id === variables.productId
                  ? { ...product, status: variables.status }
                  : product
              ),
            };
          }
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

  const productsList = data?.data || [];

  const { mutate: del, isPending: pendingDeleteProduct } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient?.invalidateQueries({ queryKey: ["products"] });
      await queryClient?.invalidateQueries({ queryKey: ["product-summaries"] });
      toast.success(`Produto deletado com sucesso!`, {
        className: "!bg-green-600 !text-white",
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        className: "!bg-red-600 !text-white",
      });
    },
  });

  const handleUpdateProductStatus = (productId: string, status: string) => {
    updateStatus({ productId, status });
  };

  const handleDeleteProduct = (productId: ProductResponseType["id"]) => {
    del({ productId });
  };

  const handlePriceProduct = (productId: ProductResponseType["id"]) => {
    router.push(`/produtos/${productId}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pagina", newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const table = useReactTable({
    data: productsList,
    columns: productsTableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: data?.totalPages ?? 0,
    meta: {
      onDeleteProduct: handleDeleteProduct,
      pendingDeleteProduct: pendingDeleteProduct,
      onPriceProduct: handlePriceProduct,
      onUpdateProductStatus: handleUpdateProductStatus,
      pendingUpdateProductStatus: pendingUpdateProductStatus,
    },
  });

  return (
    <Show when={!pendingProducts} fallback={<ProductsTableSkeleton />}>
      <Column className="bg-white h-full shadow-sm rounded-md flex flex-col">
        <div className="flex-1 overflow-auto min-h-0">
          <Table className="w-full">
            <TableHeader className="sticky top-0 bg-white z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:!bg-transparent"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-gray-400">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <Show
                when={table.getRowModel().rows?.length}
                fallback={
                  <TableRow>
                    <TableCell
                      colSpan={productsTableColumns.length}
                      className="h-24 text-center"
                    >
                      Sem resultados.
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
                      <TableCell key={cell.id}>
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
        <div className="border-t bg-white">
          <Row className="items-center justify-between w-full p-4">
            <span className="text-sm">
              Página {page} de {data?.totalPages || 0} - Total de{" "}
              {data?.count || 0} produtos
            </span>
            <TablePagination
              currentPage={page}
              totalPages={data?.totalPages || 0}
              onPageChange={handlePageChange}
            />
          </Row>
        </div>
      </Column>
    </Show>
  );
};

export default ProductsTable;
