"use client";

import { useAuth } from "@/src/providers/auth-provider";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth)
    return <Loader2 className="text-primary animate-spin m-auto w-10 h-10" />;

  return <>{children}</>;
}
