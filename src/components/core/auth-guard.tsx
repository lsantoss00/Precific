"use client";

import { useAuth } from "@/src/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [isRecoveryFlow, setIsRecoveryFlow] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecoveryFlow(true);
    }
  }, []);

  useEffect(() => {
    if (loading) return;

    if (isRecoveryFlow) return;

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
  ]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66289B]" />
      </div>
    );
  }

  if (isRecoveryFlow) {
    return <>{children}</>;
  }

  const hasAccess = requireAuth ? isAuthenticated : !isAuthenticated;

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
