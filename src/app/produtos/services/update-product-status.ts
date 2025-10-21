import { supabaseClient } from "@/src/libs/supabase/client";

interface UpdateProductStatusProps {
  productId: string;
  status: string;
}

export async function updateProductStatus({
  productId,
  status,
}: UpdateProductStatusProps) {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { data, error } = await supabaseClient
    .from("products")
    .update({ status })
    .eq("id", productId)
    .eq("user_id", session.user.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
