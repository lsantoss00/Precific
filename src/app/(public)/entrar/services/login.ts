import { createClient } from "@/src/libs/supabase/client";

interface LoginProps {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginProps) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return;
}
