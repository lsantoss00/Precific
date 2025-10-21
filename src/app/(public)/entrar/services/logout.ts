"use server";

import { createServer } from "@/src/libs/supabase/server";

export async function logout() {
  const supabase = await createServer();

  try {
    await supabase.auth.signOut();
  } catch (error) {
    throw error;
  }
}
