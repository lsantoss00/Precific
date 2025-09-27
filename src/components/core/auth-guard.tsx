"use client";

import { useAuth } from "@/src/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

  useEffect(() => {
    if (loading) return;

    const shouldRedirect = requireAuth ? !isAuthenticated : isAuthenticated;

    if (shouldRedirect) {
      router.push(redirectTo);
      return;
    }
  }, [loading, isAuthenticated, requireAuth, redirectTo, router]);

  // TO-DO: testar isso depois
  // if (loading) return <>{children}</>;
  if (loading) return;

  const hasAccess = requireAuth ? isAuthenticated : !isAuthenticated;

  if (!hasAccess) return;

  return <>{children}</>;
};

export default AuthGuard;
