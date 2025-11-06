"use client";

import { getCompanyById } from "@/src/app/(private)/perfil/services/get-company-by-id";
import { getUserProfile } from "@/src/app/(private)/perfil/services/get-user-profile";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect } from "react";
import { createClient } from "../libs/supabase/client";

interface AuthContextType {
  profile: any;
  company: any;
  isLoadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType>({
  profile: null,
  company: null,
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
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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

  const { data: company, isLoading: isLoadingCompany } = useQuery({
    queryFn: () => getCompanyById({ companyId: profile!.company_id }),
    queryKey: ["company", profile?.company_id],
    enabled: !!profile?.company_id,
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
        queryClient.removeQueries({ queryKey: ["company"] });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const isLoadingAuth =
    isLoadingUser ||
    (!!user && isLoadingProfile) ||
    (!!profile?.company_id && isLoadingCompany);

  return (
    <AuthContext.Provider
      value={{
        profile,
        company,
        isLoadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
