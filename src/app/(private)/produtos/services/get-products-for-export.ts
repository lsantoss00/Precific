import { createClient } from "@/src/libs/supabase/client";
import { ProductExportType } from "../types/product-type";

interface GetProductsForExport {
  search?: string;
}

export async function getProductsForExport({
  search,
}: GetProductsForExport): Promise<ProductExportType[]> {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  let query = supabase
    .from("products")
    .select("sku, name, ncm, price_today, price_in_2026, price_in_2027, status")
    .order("created_at", { ascending: false });

  if (search && search.trim()) {
    const searchTerm = search.trim();
    query = query.or(
      `sku.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%,ncm.ilike.%${searchTerm}%`
    );
  }

  const { data, error } = await query;

  if (error) throw error;

  return data || [];
}
