"use client";

import shortLogoImage from "@/public/images/precific-short-logo-image.webp";
import { Button } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/core/sheet";
import { useScrollToSection } from "@/src/hooks/use-scroll-to-section";
import { Compass, Home, Menu, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollToSection, scrollToTop } = useScrollToSection();

  const closeMenu = () => setIsOpen(false);

  const handleScrollToTop = () => {
    scrollToTop();
    closeMenu();
  };

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    closeMenu();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button
          variant="ghost"
          className="h-10 w-10 p-0"
          aria-label="Abrir menu de navegação"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          <Menu className="h-6! w-6!" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-[380px] p-0 [&>button]:hidden bg-zinc-50"
        id="mobile-menu"
        aria-label="Menu de navegação móvel"
      >
        <Column className="h-full">
          <Row
            as="header"
            className="items-center justify-between px-6 py-5 h-20 bg-white border-b border-zinc-200"
          >
            <Image
              src={shortLogoImage}
              alt="Logo do Precific"
              width={48}
              height={48}
              sizes="48px"
            />
            <Button
              variant="ghost"
              onClick={closeMenu}
              className="h-12 w-12 p-0"
              aria-label="Fechar menu de navegação"
            >
              <X className="h-6! w-6!" aria-hidden="true" />
            </Button>
          </Row>

          <Column
            as="nav"
            className="px-6 py-6 flex-1"
            aria-label="Navegação principal"
          >
            <Column as="ul">
              <li>
                <Button
                  variant="ghost"
                  onClick={handleScrollToTop}
                  className="flex w-full items-center justify-start gap-4 text-base text-zinc-800 hover:text-primary hover:bg-primary/5 font-medium h-auto px-4 py-3.5 rounded-lg group"
                >
                  <Home
                    className="h-5 w-5 text-zinc-800 group-hover:text-primary transition-colors"
                    aria-hidden="true"
                  />
                  Início
                </Button>
              </li>
              <li aria-hidden="true">
                <span className="block h-px bg-zinc-200 my-1" />
              </li>
              <li>
                <Button
                  variant="ghost"
                  onClick={() => handleScrollToSection("descubra")}
                  className="flex w-full items-center justify-start gap-4 text-base text-zinc-800 hover:text-primary hover:bg-primary/5 font-medium h-auto px-4 py-3.5 rounded-lg group"
                >
                  <Compass
                    className="h-5 w-5 text-zinc-800 group-hover:text-primary transition-colors"
                    aria-hidden="true"
                  />
                  Descubra
                </Button>
              </li>
              <li aria-hidden="true">
                <span className="block h-px bg-zinc-200 my-1" />
              </li>
              <li>
                <Button
                  variant="ghost"
                  onClick={() => handleScrollToSection("contato")}
                  className="flex w-full items-center justify-start gap-4 text-base text-zinc-800 hover:text-primary hover:bg-primary/5 font-medium h-auto px-4 py-3.5 rounded-lg group"
                >
                  <MessageCircle
                    className="h-5 w-5 text-zinc-800 group-hover:text-primary transition-colors"
                    aria-hidden="true"
                  />
                  Converse conosco
                </Button>
              </li>
            </Column>
          </Column>

          <Flex
            as="footer"
            className="px-6 py-6 bg-white border-t border-zinc-200"
          >
            <Button
              asChild
              className="w-full h-14 text-base font-semibold shadow-sm"
              variant="secondary"
            >
              <Link href="/entrar" onClick={closeMenu}>
                Acessar Plataforma
              </Link>
            </Button>
          </Flex>
        </Column>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
