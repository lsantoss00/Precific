import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { createClient } from "@/src/libs/supabase/client";

interface GetProductsAverageProfitability {
  filters?: ChartFiltersType;
}

export async function getProductsAverageProfitability({
  filters,
}: GetProductsAverageProfitability): Promise<number> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(
    "get_products_average_profitability",
    {
      from_date: filters?.fromDate,
      to_date: filters?.toDate,
      product_ids: filters?.productIds,
    },
  );

  if (error) {
    throw new Error("Erro ao buscar rentabilidade média dos produtos");
  }

  return data;
}
