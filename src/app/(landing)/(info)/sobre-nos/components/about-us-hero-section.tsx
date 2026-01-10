"use client";

import people1 from "@/public/images/people-1.webp";
import people2 from "@/public/images/people-2.webp";
import people3 from "@/public/images/people-3.webp";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import { Container } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import SectionWithBackground from "@/src/components/section-with-background";
import { Sparkle } from "lucide-react";
import Image from "next/image";

const AboutUsHeroSection = () => {
  return (
    <SectionWithBackground
      className="w-full min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] overflow-hidden"
      aria-labelledby="about-hero-heading"
    >
      <Container
        as="section"
        variant="section"
        className="py-20 md:py-24 lg:py-0 lg:h-full lg:flex lg:flex-col lg:justify-center"
      >
        <Flex className="flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          <FadeInOnScroll
            direction="left"
            offset={20}
            className="w-full xl:max-w-[600px] 2xl:max-w-[680px] z-10"
          >
            <Column as="header" className="gap-4 md:gap-6">
              <Column className="gap-3 max-w-lg">
                <Sparkle
                  className="text-secondary w-5 h-5 sm:w-6 sm:h-6"
                  aria-hidden="true"
                />
                <p className="text-zinc-200 text-sm sm:text-base md:text-lg">
                  Quatro décadas de experiência transformadas em estratégia,
                  controle e decisões empresariais seguras.
                </p>
              </Column>
              <h1
                id="about-hero-heading"
                className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl text-white leading-tight max-w-2xl"
              >
                Nós{" "}
                <span className="relative inline-block">
                  impulsionamos
                  <span
                    className="absolute bottom-1 left-2 sm:left-4 h-3 sm:h-4 w-full bg-linear-to-r from-secondary to-transparent -z-10"
                    aria-hidden="true"
                  />
                </span>{" "}
                empresas há mais de{" "}
                <span className="relative inline-block">
                  40 anos.
                  <span
                    className="absolute bottom-1 left-2 sm:left-4 h-3 sm:h-4 w-full bg-linear-to-r from-secondary to-transparent -z-10"
                    aria-hidden="true"
                  />
                </span>{" "}
              </h1>
            </Column>
          </FadeInOnScroll>
          <FadeInOnScroll
            direction="right"
            offset={20}
            className="relative z-10"
          >
            <Flex
              as="figure"
              className="relative mx-auto xl:mx-none"
              style={{
                width: "clamp(15.625rem, 18.75rem, 31.25rem)",
                height: "clamp(15.625rem, 18.75rem, 31.25rem)",
              }}
              aria-label="Equipe do Grupo Viriato"
            >
              <div className="relative w-full h-full">
                <Image
                  src={people1}
                  alt="Membro da equipe Grupo Viriato"
                  fill
                  priority
                  sizes="(max-width: 640px) 250px, (max-width: 768px) 340px, (max-width: 1024px) 340px, (max-width: 1280px) 280px, 500px"
                  className="object-cover object-center hover:scale-105 transition-transform duration-500 rounded-full shadow-2xl"
                />
              </div>
              <div
                className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 lg:-bottom-4 lg:-right-4 xl:-bottom-10 xl:-right-[3.375rem]"
                style={{
                  width: "clamp(7.5rem, 9.375rem, 15.625rem)",
                  height: "clamp(7.5rem, 9.375rem, 15.625rem)",
                }}
              >
                <Image
                  src={people2}
                  alt="Membro da equipe Grupo Viriato"
                  fill
                  priority
                  sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, (max-width: 1024px) 200px, (max-width: 1280px) 200px, 250px"
                  className="object-cover object-center hover:scale-105 transition-transform duration-500 rounded-full shadow-2xl"
                />
              </div>
              <div
                className="absolute -bottom-4 left-16 sm:-bottom-6 sm:left-20 md:-bottom-10 lg:-bottom-8 xl:-bottom-16 xl:left-40"
                style={{
                  width: "clamp(3.75rem, 5rem, 7.8125rem)",
                  height: "clamp(3.75rem, 5rem, 7.8125rem)",
                }}
              >
                <Image
                  src={people3}
                  alt="Membro da equipe Grupo Viriato"
                  fill
                  priority
                  sizes="(max-width: 640px) 60px, (max-width: 768px) 80px, (max-width: 1024px) 100px, (max-width: 1280px) 100px, 125px"
                  className="object-cover object-center hover:scale-105 transition-transform duration-500 rounded-full shadow-2xl"
                />
              </div>
            </Flex>
          </FadeInOnScroll>
        </Flex>
      </Container>
    </SectionWithBackground>
  );
};
export default AboutUsHeroSection;
