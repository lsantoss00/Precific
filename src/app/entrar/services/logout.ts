import { supabaseClient } from "@/src/libs/supabase/client";

export async function logout() {
  try {
    await supabaseClient.auth.signOut();
  } catch (error) {
    throw error;
  }
}
