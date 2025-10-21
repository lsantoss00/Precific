import { supabaseClient } from "@/src/libs/supabase/client";
import { ProductSummariesResponseType } from "../types/product-type";

export async function getProductSummaries(): Promise<ProductSummariesResponseType> {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { data, error } = await supabaseClient.rpc("get_dashboard_stats");

  if (error) throw error;

  return data;
}
