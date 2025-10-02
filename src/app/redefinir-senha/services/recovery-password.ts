import { supabaseClient } from "@/src/libs/supabase/client";

interface RecoveryPasswordProps {
  email: string;
}

export async function recoveryPassword({ email }: RecoveryPasswordProps) {
  const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
    email
  );

  if (error) {
    throw error;
  }

  return data;
}
