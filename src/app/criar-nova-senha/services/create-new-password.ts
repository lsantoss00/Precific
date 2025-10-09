import { supabaseClient } from "@/src/libs/supabase/client";

interface CreateNewPasswordProps {
  password: string;
}

export async function createNewPassword({ password }: CreateNewPasswordProps) {
  const { data, error } = await supabaseClient.auth.updateUser({
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}
