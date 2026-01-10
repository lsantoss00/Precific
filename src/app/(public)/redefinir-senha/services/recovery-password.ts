"use server";

import { createServer } from "@/src/libs/supabase/server";
import { ServiceResponseType } from "@/src/types/service-response-type";

interface RecoveryPasswordProps {
  email: string;
}

export async function recoveryPassword({
  email,
}: RecoveryPasswordProps): Promise<ServiceResponseType> {
  const supabase = await createServer();

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: "Erro inesperado. Tente novamente." };
  }
}
