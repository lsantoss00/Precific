"use client";

import shortLogoImage from "@/public/precific-short-logo-image.webp";
import { Button } from "@/src/components/core";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/core/sheet";
import { Compass, Home, Menu, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenu();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    closeMenu();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button
          variant="ghost"
          className="h-10 w-10 p-0"
          aria-label="Abrir menu"
          type="button"
        >
          <Menu className="!h-6 !w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-[380px] p-0 [&>button]:hidden bg-zinc-50"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 h-20 bg-white border-b border-zinc-200">
            <Image
              src={shortLogoImage}
              alt="Precific Logo"
              width={48}
              height={48}
            />
            <Button
              variant="ghost"
              onClick={closeMenu}
              className="h-12 w-12 p-0"
              aria-label="Fechar menu"
            >
              <X className="!h-6 !w-6" />
            </Button>
          </div>

          <nav className="flex flex-col px-6 py-6 flex-1">
            <Button
              variant="ghost"
              onClick={scrollToTop}
              className="flex items-center justify-start gap-4 text-base text-zinc-800 hover:text-primary hover:bg-primary/5 font-medium h-auto px-4 py-3.5 rounded-lg group"
            >
              <Home className="h-5 w-5 text-zinc-800 group-hover:text-primary transition-colors" />
              Início
            </Button>
            <div className="h-px bg-zinc-200 my-1" />
            <Button
              variant="ghost"
              onClick={() => scrollToSection("descubra")}
              className="flex items-center justify-start gap-4 text-base text-zinc-800 hover:text-primary hover:bg-primary/5 font-medium h-auto px-4 py-3.5 rounded-lg group"
            >
              <Compass className="h-5 w-5 text-zinc-800 group-hover:text-primary transition-colors" />
              Descubra
            </Button>
            <div className="h-px bg-zinc-200 my-1" />
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contato")}
              className="flex items-center justify-start gap-4 text-base text-zinc-800 hover:text-primary hover:bg-primary/5 font-medium h-auto px-4 py-3.5 rounded-lg group"
            >
              <MessageCircle className="h-5 w-5 text-zinc-800 group-hover:text-primary transition-colors" />
              Converse conosco
            </Button>
          </nav>

          <div className="px-6 py-6 bg-white border-t border-zinc-200">
            <Button
              asChild
              className="w-full h-14 text-base font-semibold shadow-sm"
              variant="secondary"
            >
              <Link href="/entrar" onClick={closeMenu}>
                Acessar Plataforma
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
