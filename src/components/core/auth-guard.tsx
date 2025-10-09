"use client";

import { useAuth } from "@/src/hooks/use-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  allowRecovery?: boolean;
}

const AuthGuardContent = ({
  children,
  requireAuth = true,
  redirectTo = "/entrar",
  allowRecovery = false,
}: AuthGuardProps) => {
  const router = useRouter();
  const searchParams = allowRecovery ? useSearchParams() : null;
  const { isAuthenticated, loading } = useAuth();
  const [isRecoveryFlow, setIsRecoveryFlow] = useState(false);

  useEffect(() => {
    if (!allowRecovery) return;

    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1));

    const type =
      searchParams?.get("type") ||
      urlParams.get("type") ||
      hashParams.get("type");
    const token =
      searchParams?.get("token") ||
      urlParams.get("token") ||
      hashParams.get("access_token");

    if (type === "recovery" && token) {
      console.log("✅ Recovery flow detectado!");
      setIsRecoveryFlow(true);
    }
  }, [allowRecovery, searchParams]);

  useEffect(() => {
    if (loading) return;

    if (isRecoveryFlow) {
      console.log("⏸️ Bloqueando redirect - é recovery flow");
      return;
    }

    const shouldRedirect = requireAuth ? !isAuthenticated : isAuthenticated;

    if (shouldRedirect) {
      console.log("🔄 Redirecionando para:", redirectTo);
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

  if (allowRecovery && isRecoveryFlow) {
    return <>{children}</>;
  }

  const hasAccess = requireAuth ? isAuthenticated : !isAuthenticated;

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};

const AuthGuard = (props: AuthGuardProps) => {
  if (props.allowRecovery) {
    return (
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66289B]" />
          </div>
        }
      >
        <AuthGuardContent {...props} />
      </Suspense>
    );
  }

  return <AuthGuardContent {...props} />;
};

export default AuthGuard;
