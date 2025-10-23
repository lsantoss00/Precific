"use server";

import { createServer } from "@/src/libs/supabase/server";

export async function logout() {
  const supabase = await createServer();
  await supabase.auth.signOut();
}
