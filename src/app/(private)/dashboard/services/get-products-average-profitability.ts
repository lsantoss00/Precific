import { createClient } from "@/src/libs/supabase/client";

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

  const { data, error } = await supabase.rpc(
    "get_products_average_profitability",
    {
      from_date: fromDate,
      to_date: toDate,
      product_ids: productIds,
    },
  );

  if (error) {
    throw new Error("Erro ao buscar rentabilidade média dos produtos");
  }

  return data;
}
