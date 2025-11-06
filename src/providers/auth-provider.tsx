"use client";

import { getUserProfile } from "@/src/app/(private)/perfil/services/get-user-profile";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../libs/supabase/client";

interface AuthContextType {
  user: User | null;
  hasCompany: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  hasCompany: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const { data: profile } = useQuery({
    queryFn: () => getUserProfile({ userId: user!.id }),
    queryKey: ["userProfile", user?.id],
    enabled: !!user?.id,
  });

  const hasCompany = !!profile?.company_id;

  return (
    <AuthContext.Provider value={{ user, hasCompany }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
