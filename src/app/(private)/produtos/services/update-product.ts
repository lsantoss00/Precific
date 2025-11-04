import { createClient } from "@/src/libs/supabase/client";
import { ProductRequestType } from "../types/product-type";

interface UpdateProductProps {
  product: ProductRequestType;
}

export async function updateProduct({ product }: UpdateProductProps) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", product?.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
