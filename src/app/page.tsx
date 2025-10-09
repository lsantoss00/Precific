"use client";

import { useAuth } from "@/src/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (isAuthenticated) {
      router.push("/produtos");
    } else {
      router.push("/entrar");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66289B]" />
      </div>
    );
  }

  return null;
}
