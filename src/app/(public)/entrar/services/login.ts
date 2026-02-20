"use server";

import { createServer } from "@/src/libs/supabase/server";
import { redirect } from "next/navigation";

interface LoginProps {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginProps) {
  const supabase = await createServer();

  let isSuccess = false;

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    isSuccess = true;
  } catch (err) {
    return { success: false, error: "Erro inesperado. Tente novamente." };
  }

  if (isSuccess) {
    redirect("/produtos");
  }
}
