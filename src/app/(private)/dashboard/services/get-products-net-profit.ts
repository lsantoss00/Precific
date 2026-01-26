import { ProductsNetProfitType } from "@/src/app/(private)/dashboard/types/products-net-profit-type";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface GetProductsNetProfitProps {
  productIds?: string[];
  sortDirection?: "asc" | "desc";
}

export async function getProductsNetProfit({
  productIds,
  sortDirection = "asc",
}: GetProductsNetProfitProps): Promise<ProductsNetProfitType[]> {
  const supabase = createClient();

  const { data: products, error } = await supabase.rpc(
    "get_products_net_profit",
    {
      ids: productIds,
      sort_direction: sortDirection,
    },
  );

  const data = camelizeKeys(products) as ProductsNetProfitType[];

  if (error) {
    throw new Error("Erro ao buscar lucro líquido dos produtos");
  }

  return data;
}
