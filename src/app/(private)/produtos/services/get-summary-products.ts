import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";
import { ProductSummariesResponseType } from "../types/product-type";

export async function getProductSummaries(): Promise<
  ProductSummariesResponseType[]
> {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { data: productsSummary, error } = await supabase.rpc(
    "get_dashboard_stats"
  );

  const data = camelizeKeys(productsSummary) as ProductSummariesResponseType[];

  if (error) throw error;

  return data;
}
