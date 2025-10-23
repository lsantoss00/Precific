"use server";

import { createServer } from "@/src/libs/supabase/server";
import { ServiceResponseType } from "@/src/types/service-response-type";

interface LoginProps {
  email: string;
  password: string;
}

export async function login({
  email,
  password,
}: LoginProps): Promise<ServiceResponseType> {
  try {
    const supabase = await createServer();

    const { error } = await supabase.auth.signInWithPassword({
      email,
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
