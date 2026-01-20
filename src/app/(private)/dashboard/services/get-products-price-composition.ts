import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { ProductPriceCompositionType } from "@/src/app/(private)/dashboard/types/products-price-composition-type";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface getProductsPriceCompositionProps {
  filters: ChartFiltersType;
}

export async function getProductsPriceComposition({
  filters,
}: getProductsPriceCompositionProps): Promise<ProductPriceCompositionType[]> {
  const supabase = createClient();

  const { data: products, error } = await supabase.rpc(
    "get_products_price_composition",
    {
      product_ids: filters.productIds,
    },
  );

  const data = camelizeKeys(products) as ProductPriceCompositionType[];

  if (error) {
    throw new Error("Erro ao buscar composições de preços dos produtos");
  }

  return data;
}
