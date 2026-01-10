"use client";

import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import { Button, Container } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import SectionWithBackground from "@/src/components/section-with-background";
import { useScrollToSection } from "@/src/hooks/use-scroll-to-section";
import dynamic from "next/dynamic";

const YouTubeEmbed = dynamic(() => import("@/src/components/youtube-embed"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-black/20 rounded-md animate-pulse" />
  ),
});

const HeroSection = () => {
  const { scrollToSection } = useScrollToSection();

  return (
    <SectionWithBackground
      className="w-full min-h-[calc(100vh-80px)] xl:h-[calc(100vh-80px)] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Container
        as="section"
        variant="section"
        className="py-20 md:py-24 xl:py-0 xl:h-full"
      >
        <Flex className="flex-col xl:flex-row items-center justify-between xl:h-full gap-8 md:gap-12">
          <FadeInOnScroll
            direction="left"
            offset={20}
            className="relative z-10 w-full xl:max-w-140"
          >
            <Column className="space-y-6 md:space-y-8">
              <Column as="header" className="space-y-4 md:space-y-5">
                <h1
                  id="hero-heading"
                  className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl text-white leading-tight"
                >
                  <span className="relative inline-block">
                    Precifique
                    <span
                      className="absolute bottom-1 left-4 h-4 w-full bg-linear-to-r from-secondary to-transparent -z-10"
                      aria-hidden="true"
                    />
                  </span>{" "}
                  seus produtos com precisão.
                </h1>
                <p className="text-zinc-200 text-base md:text-lg max-w-2xl">
                  o Precific automatiza o cálculo de preços com base em custos,
                  impostos e margens, simulando cenários futuros da Reforma
                  Tributária.
                </p>
              </Column>
              <Button
                className="w-full sm:w-fit h-12 md:h-14 px-6 md:px-8 hover:cursor-pointer font-medium text-sm md:text-base"
                variant="secondary"
                onClick={() => scrollToSection("contato")}
              >
                Agendar Demonstração
              </Button>
            </Column>
          </FadeInOnScroll>
          <FadeInOnScroll
            direction="right"
            offset={20}
            className="relative z-10 w-full xl:max-w-180 2xl:max-w-240 mt-8 xl:mt-0"
          >
            <Flex as="figure" className="aspect-video shrink-0">
              <YouTubeEmbed
                videoId="9gNKBYR-rhg"
                title="Precific — Demonstração do sistema de precificação"
              />
            </Flex>
          </FadeInOnScroll>
        </Flex>
      </Container>
    </SectionWithBackground>
  );
};
export default HeroSection;
