"use server";

import { createClient } from "@/src/libs/supabase/server";

export async function logout() {
  const supabase = await createClient();

  try {
    await supabase.auth.signOut();
  } catch (error) {
    throw error;
  }
}
