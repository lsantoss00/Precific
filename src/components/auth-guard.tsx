"use client";

import shortLogoImage from "@/public/images/precific-short-logo-image.webp";
import { useAuth } from "@/src/providers/auth-provider";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth)
    return (
      <div className="m-auto relative">
        <Loader2 className="text-primary animate-spin w-12 h-12" />
        <Image
          src={shortLogoImage}
          alt="Precific | Plataforma de Precificação Inteligente"
          width={24}
          height={24}
          sizes="24px"
          priority
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
        />
      </div>
    );

  return <>{children}</>;
}
