"use server";

import { createClient } from "@/src/libs/supabase/server";

interface RecoveryPasswordProps {
  email: string;
}

export async function recoveryPassword({ email }: RecoveryPasswordProps) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) throw error;
}
