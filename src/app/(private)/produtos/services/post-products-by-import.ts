import { ProductToImportType } from "@/src/app/(private)/produtos/types/product-type";
import { createClient } from "@/src/libs/supabase/client";
import { decamelizeKeys } from "humps";

export async function importProducts(products: ProductToImportType[]) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const data = decamelizeKeys(products);

  const { data: productsImported, error } = await supabase.rpc(
    "bulk_import_products",
    {
      products_data: data,
    }
  );

  if (error) throw error;

  return { count: productsImported?.length || 0, productsImported };
}
