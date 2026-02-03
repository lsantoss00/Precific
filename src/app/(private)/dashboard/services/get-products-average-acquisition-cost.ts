import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { createClient } from "@/src/libs/supabase/client";

interface GetProductsAverageAcquisitionCostProps {
  filters?: ChartFiltersType;
}

export async function getProductsAverageAcquisitionCost({
  filters,
}: GetProductsAverageAcquisitionCostProps): Promise<number> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(
    "get_products_average_acquisition_cost",
    {
      from_date: filters?.fromDate,
      to_date: filters?.toDate,
      product_ids: filters?.productIds,
    },
  );

  if (error) {
    throw new Error("Erro ao buscar custo médio dos produtos");
  }

  return data;
}
