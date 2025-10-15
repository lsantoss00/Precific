"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/use-auth";
import { SidebarTrigger } from "./core";
import Row from "./core/row";
import Menu from "./menu";

export function AppHeader() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  return (
    <header className="w-full bg-[#fafafa] h-20 text-white p-6 fixed top-0 left-0 z-10 border-b flex justify-center">
      <Row className="w-full h-full !max-w-7xl 2xl:!max-w-[1500px] justify-between md:justify-end items-center">
        <SidebarTrigger className="!p-0 md:hidden">
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
