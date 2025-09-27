"use client";

import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabaseClient } from "../libs/supabase/client";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchSession() {
      try {
        const { data } = await supabaseClient.auth.getSession();
        if (isMounted) {
          setSession(data.session);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchSession();

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (_event, newSession) => {
        if (isMounted) {
          setSession(newSession);
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    loading,
    isAuthenticated: !!session,
    user: session?.user || null,
  };
}
