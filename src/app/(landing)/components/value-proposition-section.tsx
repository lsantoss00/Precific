"use client";

import backgroundSectionImage from "@/public/landing-page/hero-section-background.webp";
import userImage from "@/public/landing-page/user-image.webp";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import { Button } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import { useScrollToSection } from "@/src/hooks/use-scroll-to-section";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

const ValuePropositionSection = () => {
  const { scrollToSection } = useScrollToSection();

  return (
    <Flex className="relative bg-primary w-full xl:h-168 2xl:h-175 flex-col xl:flex-row items-center justify-between overflow-hidden">
      <Image
        src={backgroundSectionImage}
        alt="Imagem de fundo"
        fill
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-linear-to-b from-primary/90 via-primary/50 to-transparent" />
      <FadeInOnScroll direction="left" offset={20} className="w-full xl:w-1/2">
        <Flex className="flex-col lg:flex-row xl:flex-col relative z-10 space-y-8 md:space-y-12 xl:space-y-12 2xl:space-y-20 w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-25 py-12 md:py-16 xl:py-16 2xl:py-20">
          <Column className="space-y-4 md:space-y-5">
            <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl text-white max-w-lg leading-tight">
              Maior precisão, menos estresse!
            </h3>
            <p className="text-white text-base md:text-lg max-w-xl">
              Com a nossa plataforma você não terá problemas para cadastrar um
              novo produto e descobrir o valor real de venda.
            </p>
            <Ellipsis className="text-white w-12 h-12 md:w-16 md:h-16 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 -my-5 -ml-2" />
          </Column>
          <Button
            className="w-full sm:w-fit h-12 md:h-14 px-6 md:px-8 hover:cursor-pointer font-medium text-sm md:text-base"
            variant="secondary"
            onClick={() => scrollToSection("contato")}
          >
            Quero falar com um especialista!
          </Button>
        </Flex>
      </FadeInOnScroll>
      <FadeInOnScroll
        direction="right"
        offset={20}
        className="relative z-10 w-full xl:w-1/2 h-80 sm:h-96 md:h-110 lg:h-140 xl:h-full"
      >
        <Image
          src={userImage}
          alt="Usuária do Precific"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 50vw"
        />
      </FadeInOnScroll>
    </Flex>
  );
};
export default ValuePropositionSection;
