"use server";

import { createServer } from "@/src/libs/supabase/server";

interface RecoveryPasswordProps {
  email: string;
}

export async function recoveryPassword({ email }: RecoveryPasswordProps) {
  const supabase = await createServer();

  await supabase.auth.resetPasswordForEmail(email);
}
