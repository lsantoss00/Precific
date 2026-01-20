import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { ProductPriceHistoryType } from "@/src/app/(private)/dashboard/types/products-price-history-type";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface GetProductsPriceHistoryProps {
  filters: ChartFiltersType;
}

export async function getProductsPriceHistory({
  filters,
}: GetProductsPriceHistoryProps): Promise<ProductPriceHistoryType[]> {
  const supabase = createClient();

  const { data: products, error } = await supabase.rpc(
    "get_products_price_history",
    {
      from_date: filters.fromDate,
      to_date: filters.toDate,
      product_ids: filters.productIds,
    },
  );

  const data = camelizeKeys(products) as ProductPriceHistoryType[];

  if (error) {
    throw new Error("Erro ao buscar histórico de preços");
  }

  return data;
}
