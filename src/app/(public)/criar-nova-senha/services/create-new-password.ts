"use server";

import { createServer } from "@/src/libs/supabase/server";

interface CreateNewPasswordProps {
  password: string;
}

type ServiceResponse = { success: true } | { success: false; message: string };

export async function createNewPassword({
  password,
}: CreateNewPasswordProps): Promise<ServiceResponse> {
  const supabase = await createServer();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}
