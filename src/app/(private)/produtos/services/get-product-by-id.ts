import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";
import { ProductRequestType, ProductResponseType } from "../types/product-type";

interface GetProductByIdProps {
  productId: ProductRequestType["id"];
}

export async function getProductById({
  productId,
}: GetProductByIdProps): Promise<ProductResponseType> {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  const data = camelizeKeys(products) as ProductResponseType;

  if (error) throw error;

  return data;
}
