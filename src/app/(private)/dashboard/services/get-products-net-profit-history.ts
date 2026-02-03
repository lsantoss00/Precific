import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { ProductNetProfitHistoryType } from "@/src/app/(private)/dashboard/types/products-net-profit-history-type";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface GetProductsNetProfitHistoryProps {
  filters: ChartFiltersType;
}

export async function getProductsNetProfitHistory({
  filters,
}: GetProductsNetProfitHistoryProps): Promise<ProductNetProfitHistoryType[]> {
  const supabase = createClient();

  const { data: products, error } = await supabase.rpc(
    "get_products_net_profit_history",
    {
      from_date: filters?.fromDate,
      to_date: filters?.toDate,
      product_ids: filters?.productIds,
    },
  );

  const data = camelizeKeys(products) as ProductNetProfitHistoryType[];

  if (error) {
    throw new Error("Erro ao buscar histórico de lucro líquido dos produtos");
  }

  return data;
}
