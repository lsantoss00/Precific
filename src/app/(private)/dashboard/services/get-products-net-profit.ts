import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { ProductsNetProfitType } from "@/src/app/(private)/dashboard/types/products-net-profit-type";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface GetProductsNetProfitProps {
  filters?: ChartFiltersType;
  sortDirection?: "asc" | "desc";
}

export async function getProductsNetProfit({
  filters,
  sortDirection = "asc",
}: GetProductsNetProfitProps): Promise<ProductsNetProfitType[]> {
  const supabase = createClient();

  const { data: products, error } = await supabase.rpc(
    "get_products_net_profit",
    {
      product_ids: filters?.productIds,
      from_date: filters?.fromDate,
      to_date: filters?.toDate,
      sort_direction: sortDirection,
    },
  );

  const data = camelizeKeys(products) as ProductsNetProfitType[];

  if (error) {
    throw new Error("Erro ao buscar lucro líquido dos produtos");
  }

  return data;
}
