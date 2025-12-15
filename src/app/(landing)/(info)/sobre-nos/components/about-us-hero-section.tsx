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
    <SectionWithBackground className="w-full min-h-[calc(100vh-80px)] xl:h-[calc(100vh-80px)] overflow-hidden pt-20">
      <Container variant="section" className="py-20 md:py-24 xl:py-0 xl:h-full">
        <Flex className="flex-col xl:flex-row items-center justify-between xl:h-full gap-8 md:gap-12">
          <FadeInOnScroll
            direction="left"
            offset={20}
            className="w-full xl:max-w-[600px] 2xl:max-w-[680px] z-10"
          >
            <Column className="gap-4 md:gap-6">
              <Column className="gap-3 max-w-lg">
                <Sparkle className="text-secondary w-5 h-5 sm:w-6 sm:h-6" />
                <p className="text-zinc-200 text-sm sm:text-base md:text-lg">
                  Quatro décadas de experiência transformadas em estratégia,
                  controle e decisões empresariais seguras.
                </p>
              </Column>
              <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl text-white leading-tight">
                Nós{" "}
                <span className="relative inline-block">
                  impulsionamos
                  <div className="absolute bottom-1 left-2 sm:left-4 h-3 sm:h-4 w-full bg-linear-to-r from-secondary to-transparent -z-10" />
                </span>{" "}
                empresas há mais <br className="hidden sm:block" /> de{" "}
                <span className="relative inline-block">
                  40 anos.
                  <div className="absolute bottom-1 left-2 sm:left-4 h-3 sm:h-4 w-full bg-linear-to-r from-secondary to-transparent -z-10" />
                </span>{" "}
              </h1>
            </Column>
          </FadeInOnScroll>

          <FadeInOnScroll
            direction="right"
            offset={20}
            className="relative z-10 w-full xl:w-auto xl:h-full mt-8 xl:mt-0"
          >
            <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[350px] lg:h-[350px] xl:w-[500px] xl:h-[500px] 2xl:w-[580px] 2xl:h-[580px] relative xl:mr-14 mx-auto">
              <Image
                src={people1}
                alt="Funcionário Grupo Viriato"
                fill
                priority
                sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 280px, (max-width: 1280px) 350px, 500px"
                className="object-cover object-center hover:scale-105 transition-transform duration-500 rounded-full shadow-2xl"
              />
              <Image
                src={people2}
                alt="Funcionário Grupo Viriato"
                width={320}
                height={320}
                priority
                sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, (max-width: 1024px) 200px, (max-width: 1280px) 250px, 320px"
                className="object-cover object-center hover:scale-105 transition-transform duration-500 rounded-full absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 lg:-bottom-8 lg:-right-8 xl:-bottom-10 xl:-right-[54px] w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] xl:w-80 xl:h-80 shadow-2xl"
              />
              <Image
                src={people3}
                alt="Funcionário Grupo Viriato"
                width={160}
                height={160}
                priority
                sizes="(max-width: 640px) 60px, (max-width: 768px) 80px, (max-width: 1024px) 100px, (max-width: 1280px) 120px, 160px"
                className="object-cover object-center hover:scale-105 transition-transform duration-500 rounded-full absolute -bottom-4 left-16 sm:-bottom-6 sm:left-20 md:-bottom-8 md:left-28 lg:-bottom-12 lg:left-36 xl:-bottom-20 xl:left-48 w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-40 xl:h-40 shadow-2xl"
              />
            </div>
          </FadeInOnScroll>
        </Flex>
      </Container>
    </SectionWithBackground>
  );
};
export default AboutUsHeroSection;
