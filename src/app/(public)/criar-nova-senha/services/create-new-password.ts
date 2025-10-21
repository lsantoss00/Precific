"use server";

import { createClient } from "@/src/libs/supabase/server";

interface CreateNewPasswordProps {
  password: string;
}

export async function createNewPassword({ password }: CreateNewPasswordProps) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;
}
