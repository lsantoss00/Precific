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
  SortingState,
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
  const sortBy = searchParams.get("ordenar") || "created_at";
  const sortOrder = (searchParams.get("ordem") as "asc" | "desc") || "desc";

  const pageSize = 10;

  const [products, setProducts] = useState<ProductResponseType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [_, setTotalCount] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([
    { id: sortBy, desc: sortOrder === "desc" },
  ]);

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
              : product
          )
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
      await queryClient.invalidateQueries({
        queryKey: ["product-summaries"],
      });
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
      onDeleteProduct: (productId: string) => del({ productId }),
      pendingDeleteProduct,
      onPriceProduct: (productId: string) =>
        router.push(`/produtos/${productId}`),
      onUpdateProductStatus: (productId: string, status: string) =>
        updateStatus({ productId, status }),
      pendingUpdateProductStatus,
    },
  });

  useEffect(() => {
    if (data?.data) setProducts(data.data);
    if (data?.totalPages !== undefined) setTotalPages(data.totalPages);
    if (data?.count !== undefined) setTotalCount(data.count);
  }, [data]);

  useEffect(() => {
    setSorting([{ id: sortBy, desc: sortOrder === "desc" }]);
  }, [sortBy, sortOrder]);

  return (
    <Column className="bg-white shadow-sm rounded-md flex flex-col !h-[630.5px]">
      <div className="flex-1 overflow-auto">
        <Table className="w-full table-fixed">
          <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:!bg-transparent">
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
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            <Show
              when={!isPending && table.getRowModel().rows?.length > 0}
              fallback={
                <TableRow className="hover:!bg-transparent">
                  <TableCell
                    colSpan={productsTableColumns.length}
                    className="h-[500px] text-center text-gray-500"
                  >
                    <Show
                      when={isPending}
                      fallback={<span>Sem resultados.</span>}
                    >
                      <Row className="justify-center items-center gap-2">
                        <Loader2 className="text-[#66289B] animate-spin" />
                        <span>Carregando produtos...</span>
                      </Row>
                    </Show>
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
      <Row className="bg-neutral-50 border-t h-13">
        <Show when={!isPending && table.getRowModel().rows?.length > 0}>
          <ProductsTablePagination currentPage={page} totalPages={totalPages} />
        </Show>
      </Row>
    </Column>
  );
};

export default ProductsTable;
