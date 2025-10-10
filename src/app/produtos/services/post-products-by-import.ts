import { supabaseClient } from "@/src/libs/supabase/client";

interface ProductImportData {
  sku: string | null;
  name: string | null;
  ncm: string | null;
  price_today: number;
  price_in_2026: number;
  price_in_2027: number;
  status: string;
}

export async function importProducts(products: ProductImportData[]) {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { data, error } = await supabaseClient
    .from("products")
    .upsert(products, {
      onConflict: "sku",
      ignoreDuplicates: false,
    })
    .select();

  if (error) throw error;

  return { count: data?.length || 0, data };
}
