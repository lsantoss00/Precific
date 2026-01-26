import { ProductsPriceHistoryType } from "@/src/app/(private)/dashboard/types/products-price-history-type";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface GetProductsNetProfitHistoryProps {
  fromDate: Date;
  toDate: Date;
  productIds: string[];
}

export async function getProductsNetProfitHistory({
  fromDate,
  toDate,
  productIds,
}: GetProductsNetProfitHistoryProps): Promise<ProductsPriceHistoryType[]> {
  const supabase = createClient();

  const { data: products, error } = await supabase.rpc(
    "get_products_net_profit_history",
    {
      from_date: fromDate,
      to_date: toDate,
      product_ids: productIds,
    },
  );

  const data = camelizeKeys(products) as ProductsPriceHistoryType[];

  if (error) {
    throw new Error("Erro ao buscar histórico de lucro líquido dos produtos");
  }

  return data;
}
