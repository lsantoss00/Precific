"use client";

import { getUserProfile } from "@/src/app/(private)/perfil/services/get-user-profile";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect } from "react";
import { createClient } from "../libs/supabase/client";

interface AuthContextType {
  profile: any;
  isLoadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType>({
  profile: null,
  isLoadingAuth: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
    queryKey: ["user"],
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryFn: () => getUserProfile({ userId: user!.id }),
    queryKey: ["profile", user?.id],
    enabled: !!user?.id,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      const relevantAuthEvents =
        event === "SIGNED_IN" ||
        event === "SIGNED_OUT" ||
        event === "TOKEN_REFRESHED";

      if (relevantAuthEvents) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }

      if (event === "SIGNED_OUT") {
        queryClient.removeQueries({ queryKey: ["profile"] });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const isLoadingAuth = isLoadingUser || (!!user && isLoadingProfile);

  return (
    <AuthContext.Provider
      value={{
        profile,
        isLoadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
