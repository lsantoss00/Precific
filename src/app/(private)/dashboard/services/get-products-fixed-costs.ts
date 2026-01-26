import { ProductsFixedCostsType } from "@/src/app/(private)/dashboard/types/products-fixed-costs-type";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface GetProductsFixedCostsProps {
  productIds?: string[];
  sortDirection?: "asc" | "desc";
}

export async function getProductsFixedCosts({
  productIds,
  sortDirection = "asc",
}: GetProductsFixedCostsProps): Promise<ProductsFixedCostsType[]> {
  const supabase = createClient();

  const { data: products, error } = await supabase.rpc(
    "get_products_fixed_costs",
    {
      ids: productIds,
      sort_direction: sortDirection,
    },
  );

  const data = camelizeKeys(products) as ProductsFixedCostsType[];

  if (error) {
    throw new Error("Erro ao buscar custos fixos dos produtos");
  }

  return data;
}
