"use server";

import { createServer } from "@/src/libs/supabase/server";

interface CreateNewPasswordProps {
  password: string;
}

export async function createNewPassword({ password }: CreateNewPasswordProps) {
  const supabase = await createServer();

  await supabase.auth.updateUser({
    password,
  });
}
