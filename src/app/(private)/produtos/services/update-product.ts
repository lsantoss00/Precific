import { createClient } from "@/src/libs/supabase/client";
import { decamelizeKeys } from "humps";
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

  const data = decamelizeKeys(product);

  const { data: products, error } = await supabase
    .from("products")
    .update(data)
    .eq("id", product?.id)
    .select()
    .single();

  if (error) throw error;

  return products;
}
