"use client";
import { Skeleton } from "@/src/components/core";
import { productsTableColumns } from "../products-table/products-table-columns";

const ProductsTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 10 }, (_, i) => i);
  const skeletonColumns = productsTableColumns.length;

  return <Skeleton className="h-full shadow-sm rounded-md flex flex-col" />;
};

export default ProductsTableSkeleton;
