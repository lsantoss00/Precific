import { createClient } from "@/src/libs/supabase/client";
import { camelize } from "humps";

interface getProductsAverageNetProfitProps {
  fromDate?: Date;
  toDate?: Date;
  productIds?: string[];
}

export async function getProductsAverageNetProfit({
  fromDate,
  toDate,
  productIds,
}: getProductsAverageNetProfitProps): Promise<number> {
  const supabase = createClient();

  const { data: averagePrice, error } = await supabase.rpc(
    "get_products_average_net_profit",
    {
      from_date: fromDate,
      to_date: toDate,
      product_ids: productIds,
    },
  );

  const data = camelize(averagePrice);

  if (error) {
    throw new Error("Erro ao buscar lucro líquido médio dos produtos");
  }

  return data;
}
