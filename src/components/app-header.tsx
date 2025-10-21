"use client";

import Image from "next/image";
import { SidebarTrigger } from "./core";
import Row from "./core/row";
import Menu from "./menu";

export function AppHeader() {
  return (
    <header className="bg-[#fafafa] min-h-20 max-h-20 text-white p-6 sticky top-0 z-50 border-b flex shrink-0">
      <Row className="w-full h-full max-w-7xl xl:max-w-5xl 2xl:max-w-[1500px] justify-between xl:justify-end items-center mx-auto">
        <SidebarTrigger className="!p-0 xl:!hidden">
          <Image
            src="/precific-short-logo.png"
            alt="precific-logo"
            width={48}
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
