"use server";

import { createServer } from "@/src/libs/supabase/server";

interface RecoveryPasswordProps {
  email: string;
}

export async function recoveryPassword({ email }: RecoveryPasswordProps) {
  const supabase = await createServer();

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return {
        success: false,
        error: { code: error.code, message: error.message },
      };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: "Erro inesperado. Tente novamente." };
  }
}
