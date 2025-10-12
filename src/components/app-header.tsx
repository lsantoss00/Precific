"use client";

import { useAuth } from "../hooks/use-auth";
import Row from "./core/row";
import Menu from "./menu";

export function AppHeader() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <header className="w-full bg-[#fafafa] h-20 text-white p-6 fixed top-0 left-0 z-10 border-b flex justify-center">
      <Row className="w-full h-full !max-w-7xl justify-end items-center">
        <Menu />
      </Row>
    </header>
  );
}
