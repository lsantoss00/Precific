import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { ProductsFixedCostsType } from "@/src/app/(private)/dashboard/types/products-fixed-costs-type";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface GetProductsFixedCostsProps {
  filters?: ChartFiltersType;
  sortDirection?: "asc" | "desc";
}

export async function getProductsFixedCosts({
  filters,
  sortDirection = "asc",
}: GetProductsFixedCostsProps): Promise<ProductsFixedCostsType[]> {
  const supabase = createClient();

  const { data: products, error } = await supabase.rpc(
    "get_products_fixed_costs",
    {
      product_ids: filters?.productIds,
      from_date: filters?.fromDate,
      to_date: filters?.toDate,
      sort_direction: sortDirection,
    },
  );

  const data = camelizeKeys(products) as ProductsFixedCostsType[];

  if (error) {
    throw new Error("Erro ao buscar custos fixos dos produtos");
  }

  return data;
}
