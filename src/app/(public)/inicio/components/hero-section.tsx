import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import { Button } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import YouTubeEmbed from "@/src/components/youtube-embed";
import Link from "next/link";

const HeroSection = () => {
  return (
    <Flex className="relative bg-primary w-full py-20 md:py-24 xl:py-0 xl:h-180 2xl:h-200 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-25 flex-col xl:flex-row items-center justify-between bg-[url('/landing-page/hero-section-background.webp')] bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-primary/90 via-primary/50 to-transparent" />
      <FadeInOnScroll direction="up" delay={0.2}>
        <Column className="relative z-10 w-full xl:max-w-140 space-y-6 md:space-y-8">
          <Column className="space-y-4 md:space-y-5">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl text-white leading-tight">
              Precifique seus produtos com precisão.
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              A Precific automatiza o cálculo de preços com base em custos,
              impostos e margens, simulando cenários futuros da Reforma
              Tributária.
            </p>
          </Column>
          <Button
            asChild
            className="w-full sm:w-fit h-12 md:h-14 px-6 md:px-8 hover:cursor-pointer font-medium text-sm md:text-base"
            variant="secondary"
          >
            <Link href="/entrar">Agendar Demonstração</Link>
          </Button>
        </Column>
      </FadeInOnScroll>
      <FadeInOnScroll
        direction="up"
        delay={0.4}
        className="relative z-10 w-full xl:max-w-180 2xl:max-w-240 mt-8 xl:mt-0 aspect-video"
      >
        <YouTubeEmbed videoId="9gNKBYR-rhg" title="Precific — Demonstração" />
      </FadeInOnScroll>
    </Flex>
  );
};
export default HeroSection;
