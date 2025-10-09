"use client";

import { useAuth } from "@/src/hooks/use-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  allowRecovery?: boolean;
}

const AuthGuard = ({
  children,
  requireAuth = true,
  redirectTo = "/entrar",
  allowRecovery = false,
}: AuthGuardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, loading } = useAuth();
  const [isRecoveryFlow, setIsRecoveryFlow] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (allowRecovery) {
      const type = searchParams.get("type");
      const token = searchParams.get("token");

      if (type === "recovery" && token) {
        setIsRecoveryFlow(true);
        return;
      }
    }

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
    allowRecovery,
    searchParams,
  ]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66289B]" />
      </div>
    );
  }

  if (allowRecovery && isRecoveryFlow) {
    return <>{children}</>;
  }

  const hasAccess = requireAuth ? isAuthenticated : !isAuthenticated;

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
