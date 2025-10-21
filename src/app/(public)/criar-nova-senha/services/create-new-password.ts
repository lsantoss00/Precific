"use server";

import { createServer } from "@/src/libs/supabase/server";

interface CreateNewPasswordProps {
  password: string;
}

export async function createNewPassword({ password }: CreateNewPasswordProps) {
  const supabase = await createServer();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) return error.message;
}
