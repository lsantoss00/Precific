import { supabaseClient } from "@/src/libs/supabase/client";
import { ProductResponseType } from "../types/product-type";

interface GetProductByIdProps {
  productId: ProductResponseType["id"];
}

export async function getProductById({
  productId,
}: GetProductByIdProps): Promise<ProductResponseType> {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) throw error;

  return data;
}
