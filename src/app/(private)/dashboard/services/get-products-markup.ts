import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { ProductsMarkupType } from "@/src/app/(private)/dashboard/types/products-markup-type";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface GetProductsMarkupProps {
  filters?: ChartFiltersType;
  sortDirection?: "asc" | "desc";
}

export async function getProductsMarkup({
  filters,
  sortDirection = "asc",
}: GetProductsMarkupProps): Promise<ProductsMarkupType[]> {
  const supabase = createClient();

  const { data: products, error } = await supabase.rpc("get_products_markup", {
    product_ids: filters?.productIds,
    from_date: filters?.fromDate,
    to_date: filters?.toDate,
    sort_direction: sortDirection,
  });

  const data = camelizeKeys(products) as ProductsMarkupType[];

  if (error) {
    throw new Error("Erro ao buscar markup dos produtos");
  }

  return data;
}
