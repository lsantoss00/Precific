import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { ProductsShippingType } from "@/src/app/(private)/dashboard/types/products-shipping-type";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface GetProductsShippingProps {
  filters?: ChartFiltersType;
  sortDirection?: "asc" | "desc" | null;
}

export async function getProductsShipping({
  filters,
  sortDirection = "asc",
}: GetProductsShippingProps): Promise<ProductsShippingType[]> {
  const supabase = createClient();

  const { data: products, error } = await supabase.rpc(
    "get_products_shipping",
    {
      product_ids: filters?.productIds,
      from_date: filters?.fromDate,
      to_date: filters?.toDate,
      sort_direction: sortDirection,
    },
  );

  const data = camelizeKeys(products) as ProductsShippingType[];

  if (error) {
    throw new Error("Erro ao buscar frete dos produtos");
  }

  return data;
}
