"use client";

import { getCompanyById } from "@/src/app/(private)/perfil/services/get-company-by-id";
import { getCompanySubscriptionStatus } from "@/src/app/(private)/perfil/services/get-company-subscription-status";
import { getUserProfile } from "@/src/app/(private)/perfil/services/get-user-profile";
import { CompanyType } from "@/src/app/(private)/perfil/types/company-type";
import { ProfileType } from "@/src/app/(private)/perfil/types/profile-type";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect } from "react";
import { createClient } from "../libs/supabase/client";

interface AuthContextType {
  profile: ProfileType | null;
  company: CompanyType | null;
  isPremium: boolean;
  expiresAt: string | null;
  isLoadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType>({
  profile: null,
  company: null,
  isPremium: false,
  expiresAt: null,
  isLoadingAuth: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const { data: user, isLoading: isLoadingUser } = useQuery<User | null>({
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

  const { data: company, isLoading: isLoadingCompany } =
    useQuery<CompanyType | null>({
      queryFn: () => getCompanyById({ companyId: profile!.company_id! }),
      queryKey: ["company", profile?.company_id],
      enabled: !!profile?.company_id,
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });

  const { data: subscription, isLoading: isLoadingSubscription } = useQuery({
    queryFn: () => {
      if (!profile?.company_id) return null;
      return getCompanySubscriptionStatus({ companyId: profile.company_id });
    },
    queryKey: ["company-subscription", profile?.company_id],
    enabled: !!profile?.company_id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 10,
  });

  useEffect(() => {
    const {
      data: { subscription: authSubscription },
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
        queryClient.removeQueries({ queryKey: ["company-subscription"] });
      }
    });

    return () => authSubscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!profile?.company_id) return;

    const channel = supabase
      .channel("company-subscription-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "company_subscriptions",
          filter: `company_id=eq.${profile.company_id}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["company-subscription", profile.company_id],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.company_id, supabase]);

  const isLoadingAuth =
    isLoadingUser ||
    (!!user && isLoadingProfile) ||
    (!!profile?.company_id && isLoadingCompany) ||
    (!!company && isLoadingSubscription);

  const isPremium = subscription?.hasActiveSubscription ?? false;
  const expiresAt = subscription?.expiresAt ?? null;

  return (
    <AuthContext.Provider
      value={{
        profile: profile ?? null,
        company: company ?? null,
        isPremium,
        expiresAt,
        isLoadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
