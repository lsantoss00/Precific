import { createClient } from "@/src/libs/supabase/client";
import { ProductRequestType } from "../types/product-type";

interface DeleteProductProps {
  productId: ProductRequestType["id"];
}

export async function deleteProduct({ productId }: DeleteProductProps) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .eq("user_id", session.user.id);

  if (error) throw error;

  return;
}
