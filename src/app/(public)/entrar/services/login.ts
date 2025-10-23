"use server";

import { createServer } from "@/src/libs/supabase/server";

interface LoginProps {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginProps) {
  const supabase = await createServer();

  await supabase.auth.signInWithPassword({
    email,
    password,
  });
}
