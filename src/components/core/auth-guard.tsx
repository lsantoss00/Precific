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
    }
  }, [loading, isAuthenticated, requireAuth, redirectTo, router]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66289B]" />
      </div>
    );
  }
  const hasAccess = requireAuth ? isAuthenticated : !isAuthenticated;

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
