import { createClient } from "@/src/libs/supabase/client";
import { decamelizeKeys } from "humps";
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

  // WORKAROUND: humps is returning price_in2027 instead price_in_2027
  const { priceIn2026, priceIn2027, ...rest } = product;

  const data = {
    price_in_2026: priceIn2026,
    price_in_2027: priceIn2027,
    ...decamelizeKeys(rest),
  };

  const { error } = await supabase.from("products").insert(data).select();

  if (error) throw error;

  return;
}
