import { createClient } from "@/src/libs/supabase/client";
import { camelize } from "humps";

interface GetProductsAverageAcquisitionCostProps {
  fromDate?: Date;
  toDate?: Date;
  productIds?: string[];
}

export async function getProductsAverageAcquisitionCost({
  fromDate,
  toDate,
  productIds,
}: GetProductsAverageAcquisitionCostProps): Promise<number> {
  const supabase = createClient();

  const { data: averagePrice, error } = await supabase.rpc(
    "get_products_average_acquisition_cost",
    {
      from_date: fromDate,
      to_date: toDate,
      product_ids: productIds,
    },
  );

  const data = camelize(averagePrice);

  if (error) {
    throw new Error("Erro ao buscar custo médio dos produtos");
  }

  return data;
}
