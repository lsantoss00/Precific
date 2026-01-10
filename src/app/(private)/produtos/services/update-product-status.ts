import { createClient } from "@/src/libs/supabase/client";

interface UpdateProductStatusProps {
  productId: string;
  status: string;
}

export async function updateProductStatus({
  productId,
  status,
}: UpdateProductStatusProps) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { data, error } = await supabase
    .from("products")
    .update({ status })
    .eq("id", productId)
    .select()
    .single();

  if (error) throw error;

  return data;
}
