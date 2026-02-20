"use server";

import { createServer } from "@/src/libs/supabase/server";
import { redirect } from "next/navigation";

interface LoginProps {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginProps) {
  const supabase = await createServer();

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: { code: error.code, message: error.message },
      };
    }
  } catch (err) {
    return { success: false, error: "unexpected_error" };
  }

  redirect("/produtos");
}
