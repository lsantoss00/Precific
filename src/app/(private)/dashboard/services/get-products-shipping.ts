import { ProductsShippingType } from "@/src/app/(private)/dashboard/types/products-shipping-type";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface GetProductsShippingProps {
  productIds?: string[];
  sortDirection?: "asc" | "desc";
}

export async function getProductsShipping({
  productIds,
  sortDirection = "asc",
}: GetProductsShippingProps): Promise<ProductsShippingType[]> {
  const supabase = createClient();

  const { data: products, error } = await supabase.rpc(
    "get_products_shipping",
    {
      ids: productIds,
      sort_direction: sortDirection,
    },
  );

  const data = camelizeKeys(products) as ProductsShippingType[];

  if (error) {
    throw new Error("Erro ao buscar frete dos produtos");
  }

  return data;
}
