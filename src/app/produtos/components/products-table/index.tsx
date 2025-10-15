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
import { useEffect, useRef, useState } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const search = searchParams.get("filtro") || "";
  const pageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState<ProductResponseType[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
    setAllProducts([]);
    setTotalCount(0);
  }, [search]);

  const { data, isPending, isFetching } = useQuery({
    queryFn: () => getProducts({ page: currentPage, pageSize, search }),
    queryKey: ["products", currentPage, pageSize, search],
  });

  const hasMore = data?.totalPages ? currentPage < data.totalPages : false;

  useEffect(() => {
    if (data?.data) {
      setAllProducts((prev) => {
        if (currentPage === 1) {
          return data.data;
        }
        return [...prev, ...data.data];
      });
    }
    if (data?.count !== undefined) {
      setTotalCount(data.count);
    }
  }, [data, currentPage]);

  const { mutate: updateStatus, isPending: pendingUpdateProductStatus } =
    useMutation({
      mutationFn: updateProductStatus,
      onSuccess: async (_, variables) => {
        setAllProducts((prev) =>
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
    onSuccess: async (_, variables) => {
      setAllProducts((prev) =>
        prev.filter((product) => product.id !== variables.productId)
      );
      setTotalCount((prev) => prev - 1);
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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    if (scrollPercentage > 0.8 && hasMore && !isFetching) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const table = useReactTable({
    data: allProducts,
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

  const showSkeleton = isPending && currentPage === 1;

  return (
    <Show when={!showSkeleton} fallback={<ProductsTableSkeleton />}>
      <Column
        className="bg-white shadow-sm rounded-md flex flex-col"
        style={{ height: "calc(100vh - 400px)", minHeight: "500px" }}
      >
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overflow-x-auto"
          onScroll={handleScroll}
        >
          <Table className="w-full">
            <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:!bg-transparent"
                >
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
          <Show when={isFetching && currentPage > 1}>
            <Row className="justify-center py-6">
              <Row className="flex items-center gap-2">
                <Loader2 className="text-[#66289B] animate-spin" />
                <span className="text-sm text-gray-600">
                  Carregando mais produtos...
                </span>
              </Row>
            </Row>
          </Show>
          <Show when={!hasMore && allProducts.length > 0 && !isFetching}>
            <div className="flex justify-center py-6 text-sm text-gray-500">
              Não há mais produtos para carregar
            </div>
          </Show>
        </div>
        <div className="border-t bg-gray-50 flex-shrink-0">
          <Row className="items-center justify-between w-full px-4 py-3">
            <span className="text-sm text-gray-600">
              Mostrando <strong>{allProducts.length}</strong> de{" "}
              <strong>{totalCount}</strong> produtos
            </span>
          </Row>
        </div>
      </Column>
    </Show>
  );
};

export default ProductsTable;
