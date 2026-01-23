import { createClient } from "@/src/libs/supabase/client";
import { camelize } from "humps";

interface GetProductsMarkupProps {
  fromDate?: Date;
  toDate?: Date;
  productIds?: string[];
}

export async function getProductsAveragePrice({
  fromDate,
  toDate,
  productIds,
}: GetProductsMarkupProps): Promise<number> {
  const supabase = createClient();

  const { data: averagePrice, error } = await supabase.rpc(
    "get_products_average_price",
    {
      from_date: fromDate,
      to_date: toDate,
      product_ids: productIds,
    },
  );

  const data = camelize(averagePrice);

  if (error) {
    throw new Error("Erro ao buscar preço médio dos produtos");
  }

  return data;
}
