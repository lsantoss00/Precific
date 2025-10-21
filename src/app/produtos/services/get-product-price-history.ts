import { supabaseClient } from "@/src/libs/supabase/client";
import { ProductHistoryType, ProductRequestType } from "../types/product-type";

interface GetProductPriceHistoryProps {
  productId: ProductRequestType["id"];
}

export async function getProductPriceHistory({
  productId,
}: GetProductPriceHistoryProps): Promise<ProductHistoryType[]> {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { data, error } = await supabaseClient
    .from("product_price_history")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}
