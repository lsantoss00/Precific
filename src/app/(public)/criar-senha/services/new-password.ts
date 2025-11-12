"use server";

import { createServer } from "@/src/libs/supabase/server";

interface NewPasswordProps {
  password: string;
}

export async function newPassword({ password }: NewPasswordProps) {
  const supabase = await createServer();

  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: "Erro inesperado. Tente novamente." };
  }
}
