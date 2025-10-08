import { supabaseClient } from "@/src/libs/supabase/client";
import { ProductRequestType } from "../types/product-type";

interface PostProductProps {
  product: ProductRequestType;
}

export async function postProduct({ product }: PostProductProps) {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { error } = await supabaseClient
    .from("products")
    .insert(product)
    .select();

  if (error) throw error;

  return;
}
