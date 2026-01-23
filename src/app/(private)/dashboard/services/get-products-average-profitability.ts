import { createClient } from "@/src/libs/supabase/client";
import { camelize } from "humps";

interface GetProductsAverageProfitability {
  fromDate?: Date;
  toDate?: Date;
  productIds?: string[];
}

export async function getProductsAverageProfitability({
  fromDate,
  toDate,
  productIds,
}: GetProductsAverageProfitability): Promise<number> {
  const supabase = createClient();

  const { data: averagePrice, error } = await supabase.rpc(
    "get_products_average_profitability",
    {
      from_date: fromDate,
      to_date: toDate,
      product_ids: productIds,
    },
  );

  const data = camelize(averagePrice);

  if (error) {
    throw new Error("Erro ao buscar rentabilidade média dos produtos");
  }

  return data;
}
