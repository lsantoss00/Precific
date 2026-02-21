"use client";

import { getCompanyById } from "@/src/app/(private)/perfil/services/get-company-by-id";
import { getCompanySubscriptionStatus } from "@/src/app/(private)/perfil/services/get-company-subscription-status";
import { getUserProfile } from "@/src/app/(private)/perfil/services/get-user-profile";
import { CompanyType } from "@/src/app/(private)/perfil/types/company-type";
import { ProfileType } from "@/src/app/(private)/perfil/types/profile-type";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo } from "react";
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

  const {
    data: user,
    isLoading: isLoadingUser,
    isFetching: isFetchingUser,
  } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
    staleTime: 1000 * 60 * 60,
  });

  const {
    data: profile,
    isLoading: isLoadingProfile,
    isFetching: isFetchingProfile,
  } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getUserProfile({ userId: user!.id }),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 30,
  });

  const {
    data: company,
    isLoading: isLoadingCompany,
    isFetching: isFetchingCompany,
  } = useQuery<CompanyType | null>({
    queryKey: ["company", profile?.companyId],
    queryFn: () => getCompanyById({ companyId: profile!.companyId! }),
    enabled: !!profile?.companyId,
    staleTime: 1000 * 60 * 30,
  });

  const {
    data: subscription,
    isLoading: isLoadingSubscription,
    isFetching: isFetchingSubscription,
  } = useQuery({
    queryKey: ["company-subscription", profile?.companyId],
    queryFn: () => {
      if (!profile?.companyId) return null;
      return getCompanySubscriptionStatus({ companyId: profile.companyId });
    },
    enabled: !!profile?.companyId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      }

      if (event === "SIGNED_OUT") {
        queryClient.clear();
      }
    });

    return () => authListener.unsubscribe();
  }, [supabase, queryClient]);

  useEffect(() => {
    if (!profile?.companyId) return;

    const channel = supabase
      .channel(`subscription-change-${profile.companyId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "company_subscriptions",
          filter: `company_id=eq.${profile.companyId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["company-subscription", profile.companyId],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.companyId, supabase, queryClient]);

  const isLoadingAuth = useMemo(() => {
    if (isLoadingUser || isFetchingUser) return true;
    if (user && (isLoadingProfile || isFetchingProfile)) return true;
    if (profile?.companyId && (isLoadingCompany || isFetchingCompany))
      return true;
    if (profile?.companyId && (isLoadingSubscription || isFetchingSubscription))
      return true;
    return false;
  }, [
    user,
    profile?.companyId,
    isLoadingUser,
    isFetchingUser,
    isLoadingProfile,
    isFetchingProfile,
    isLoadingCompany,
    isFetchingCompany,
    isLoadingSubscription,
    isFetchingSubscription,
  ]);

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
