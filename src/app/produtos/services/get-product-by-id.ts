import { supabaseClient } from "@/src/libs/supabase/client";
import { ProductType } from "../types/product-type";

interface GetProductByIdProps {
  productId: string;
}

export async function getProductById({
  productId,
}: GetProductByIdProps): Promise<ProductType> {
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
