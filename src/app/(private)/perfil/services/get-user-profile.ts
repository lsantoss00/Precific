import { createClient } from "@/src/libs/supabase/client";
import { User } from "@supabase/supabase-js";

interface GetUserProfileProps {
  userId: User["id"];
}

export async function getUserProfile({
  userId,
}: GetUserProfileProps): Promise<any> {
  // TO-DO: Criar uma tipagem para o retorno de perfil de usuário
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Usuário não autenticado");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}
