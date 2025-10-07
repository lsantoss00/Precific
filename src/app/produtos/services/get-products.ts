import { supabaseClient } from "@/src/libs/supabase/client";

export async function getProducts() {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}
