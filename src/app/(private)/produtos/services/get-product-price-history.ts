import { createClient } from "@/src/libs/supabase/client";
import { ProductHistoryType, ProductRequestType } from "../types/product-type";

interface GetProductPriceHistoryProps {
  productId: ProductRequestType["id"];
}

export async function getProductPriceHistory({
  productId,
}: GetProductPriceHistoryProps): Promise<ProductHistoryType[]> {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { data, error } = await supabase
    .from("product_price_history")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}
