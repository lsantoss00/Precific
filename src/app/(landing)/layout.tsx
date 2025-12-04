"use client";

import Header from "@/src/app/(landing)/components/header";
import Column from "@/src/components/core/column";
import { useEffect } from "react";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return (
    <Column className="w-full min-h-screen">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
    </Column>
  );
}
