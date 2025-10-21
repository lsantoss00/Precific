import { createClient } from "@/src/libs/supabase/client";
import { ProductType } from "../types/product-type";

interface PostProductProps {
  product: ProductType;
}

export async function postProduct({ product }: PostProductProps) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { error } = await supabase.from("products").insert(product).select();

  if (error) throw error;

  return;
}
