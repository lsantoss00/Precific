import { supabaseClient } from "@/src/libs/supabase/client";

interface DoLoginProps {
  email: string;
  password: string;
}

export async function doLogin({ email, password }: DoLoginProps) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}
