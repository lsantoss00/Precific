import { ProductsPricesAndNetProfitsType } from "@/src/app/(private)/dashboard/types/products-prices-and-net-profits-type";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface getProductsPricesAndNetProfitsProps {
  productIds: string[];
}

export async function getProductsPricesAndNetProfits({
  productIds,
}: getProductsPricesAndNetProfitsProps): Promise<
  ProductsPricesAndNetProfitsType[]
> {
  const supabase = createClient();

  const { data: products, error } = await supabase.rpc(
    "get_products_prices_and_net_profits",
    {
      ids: productIds,
    },
  );

  const data = camelizeKeys(products) as ProductsPricesAndNetProfitsType[];

  if (error) {
    throw new Error("Erro ao buscar preços e lucros dos produtos");
  }

  return data;
}
