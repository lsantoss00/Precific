"use client";

import { useAuth } from "@/src/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const AuthGuard = ({
  children,
  requireAuth = true,
  redirectTo = "/entrar",
}: AuthGuardProps) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  const isRecoveryFlow = useMemo(() => {
    if (typeof window === "undefined") return false;
    const hash = window.location.hash;

    return hash.includes("type=recovery");
  }, []);

  const isInviteFlow = useMemo(() => {
    if (typeof window === "undefined") return false;
    const hash = window.location.hash;

    return hash.includes("type=invite");
  }, []);

  useEffect(() => {
    if (loading) return;

    if (isRecoveryFlow || isInviteFlow) return;

    const shouldRedirect = requireAuth ? !isAuthenticated : isAuthenticated;
    if (shouldRedirect) {
      router.push(redirectTo);
    }
  }, [
    loading,
    isAuthenticated,
    requireAuth,
    redirectTo,
    router,
    isRecoveryFlow,
    isInviteFlow,
  ]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66289B]" />
      </div>
    );
  }

  if (isRecoveryFlow || isInviteFlow) {
    return <>{children}</>;
  }

  const hasAccess = requireAuth ? isAuthenticated : !isAuthenticated;
  if (!hasAccess) return null;

  return <>{children}</>;
};

export default AuthGuard;
