"use server";

import { createServer } from "@/src/libs/supabase/server";
import { ServiceResponseType } from "@/src/types/service-response-type";

export async function logout(): Promise<ServiceResponseType> {
  const supabase = await createServer();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: "Erro inesperado. Tente novamente." };
  }
}
