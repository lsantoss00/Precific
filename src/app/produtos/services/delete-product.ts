import { supabaseClient } from "@/src/libs/supabase/client";
import { ProductResponseType } from "../types/product-type";

interface DeleteProductProps {
  productId: ProductResponseType["id"];
}

export async function deleteProduct({ productId }: DeleteProductProps) {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { error } = await supabaseClient
    .from("products")
    .delete()
    .eq("id", productId)
    .eq("user_id", session.user.id);

  if (error) throw error;

  return;
}
