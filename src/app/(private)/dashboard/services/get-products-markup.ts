import { ProductsMarkupType } from "@/src/app/(private)/dashboard/types/products-markup";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface GetProductsMarkupProps {
  productIds?: string[];
  sortDirection?: "asc" | "desc";
}

export async function getProductsMarkup({
  productIds,
  sortDirection = "asc",
}: GetProductsMarkupProps): Promise<ProductsMarkupType[]> {
  const supabase = createClient();

  const { data: products, error } = await supabase.rpc("get_product_markups", {
    product_ids: productIds,
    sort_direction: sortDirection,
  });

  const data = camelizeKeys(products) as ProductsMarkupType[];

  if (error) {
    throw new Error("Erro ao buscar markup dos produtos");
  }

  return data;
}
