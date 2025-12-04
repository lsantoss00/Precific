"use client";

import shortLogoImage from "@/public/precific-short-logo-image.webp";
import { Button } from "@/src/components/core";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./mobile-menu";

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 2xl:px-25 py-4 h-20 bg-white border-b border-zinc-200">
      <nav className="flex items-center space-x-4 md:space-x-8">
        <Image
          src={shortLogoImage}
          alt="Precific Logo"
          width={48}
          height={48}
          priority
        />
        <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <li>
            <Button
              variant="ghost"
              onClick={scrollToTop}
              className="text-sm lg:text-base text-zinc-800 hover:text-primary font-medium transition-colors py-2 px-0 h-auto border-b-2 border-transparent hover:border-primary hover:!bg-transparent rounded-none"
            >
              Início
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("descubra")}
              className="text-sm lg:text-base text-zinc-800 hover:text-primary font-medium transition-colors py-2 px-0 h-auto border-b-2 border-transparent hover:border-primary hover:!bg-transparent rounded-none"
            >
              Descubra
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contato")}
              className="text-sm lg:text-base text-zinc-800 hover:text-primary font-medium transition-colors py-2 px-0 h-auto border-b-2 border-transparent hover:border-primary hover:!bg-transparent rounded-none"
            >
              Converse conosco
            </Button>
          </li>
        </ul>
      </nav>
      <Button
        asChild
        className="hidden md:flex w-fit h-10 md:h-12 px-4 md:px-6 text-sm md:text-base font-medium"
        variant="secondary"
      >
        <Link href="/entrar">Acessar Plataforma</Link>
      </Button>
      <MobileMenu />
    </header>
  );
};

export default Header;
