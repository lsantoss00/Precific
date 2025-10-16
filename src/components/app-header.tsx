"use client";

import Image from "next/image";
import { useAuth } from "../hooks/use-auth";
import { SidebarTrigger } from "./core";
import Row from "./core/row";
import Menu from "./menu";

export function AppHeader() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <header className="bg-[#fafafa] min-h-20 text-white p-6 sticky top-0 z-10 border-b flex shrink-0">
      <Row className="w-full h-full !max-w-7xl xl:!max-w-6xl 2xl:!max-w-[1500px] justify-between xl:!justify-end items-center mx-auto">
        <SidebarTrigger className="!p-0 xl:!hidden">
          <Image
            src="/precific-short-logo.png"
            alt="precific-logo"
            width={60}
            height={60}
            quality={100}
            className="hover:cursor-pointer !select-none"
          />
        </SidebarTrigger>
        <Menu />
      </Row>
    </header>
  );
}
