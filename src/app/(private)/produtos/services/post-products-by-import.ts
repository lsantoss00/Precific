import { ProductToImportType } from "@/src/app/(private)/produtos/types/product-type";
import { createClient } from "@/src/libs/supabase/client";
import { decamelizeKeys } from "humps";

export async function importProducts(products: ProductToImportType[]) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  // WORKAROUND: humps is returning price_in2027 instead price_in_2027
  const data = products.map((product) => {
    const { priceIn2026, priceIn2027, ...rest } = product;

    return {
      price_in_2026: priceIn2026,
      price_in_2027: priceIn2027,
      ...decamelizeKeys(rest),
    };
  });

  const { data: productsImported, error } = await supabase.rpc(
    "bulk_import_products",
    {
      products_data: data,
    }
  );

  if (error) throw error;

  return { count: productsImported?.length || 0, productsImported };
}
