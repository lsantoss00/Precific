import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { ProductsPricesAndAcquisitionCostsType } from "@/src/app/(private)/dashboard/types/products-prices-and-acquisition-costs-type";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface GetProductsPricesAndAcquisitionCostsProps {
  filters: ChartFiltersType;
}

export async function getProductsPricesAndAcquisitionCosts({
  filters,
}: GetProductsPricesAndAcquisitionCostsProps): Promise<
  ProductsPricesAndAcquisitionCostsType[]
> {
  const supabase = createClient();

  const { data: products, error } = await supabase.rpc(
    "get_products_prices_and_acquisition_costs",
    {
      ids: filters.productIds,
    },
  );

  const data = camelizeKeys(
    products,
  ) as ProductsPricesAndAcquisitionCostsType[];

  if (error) {
    throw new Error("Erro ao buscar composições de preços dos produtos");
  }

  return data;
}
