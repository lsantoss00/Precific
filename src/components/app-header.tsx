"use client";

import { useMemo } from "react";
import { useAuth } from "../hooks/use-auth";
import Row from "./core/row";
import Menu from "./menu";

export function AppHeader() {
  const { user } = useAuth();

  const isRecoveryFlow = useMemo(() => {
    if (typeof window === "undefined") return false;
    const hash = window.location.hash;
    return hash.includes("type=recovery");
  }, []);

  if (!user || isRecoveryFlow) return null;

  return (
    <header className="w-full bg-[#fafafa] h-20 text-white py-4 fixed top-0 left-0 z-10 border-b">
      <Row className="mx-20 justify-end items-center h-full">
        <Menu />
      </Row>
    </header>
  );
}
