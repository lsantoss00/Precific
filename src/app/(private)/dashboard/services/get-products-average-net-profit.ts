import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { createClient } from "@/src/libs/supabase/client";

interface getProductsAverageNetProfitProps {
  filters?: ChartFiltersType;
}

export async function getProductsAverageNetProfit({
  filters,
}: getProductsAverageNetProfitProps): Promise<number> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(
    "get_products_average_net_profit",
    {
      from_date: filters?.fromDate,
      to_date: filters?.toDate,
      product_ids: filters?.productIds,
    },
  );

  if (error) {
    throw new Error("Erro ao buscar lucro líquido médio dos produtos");
  }

  return data;
}
