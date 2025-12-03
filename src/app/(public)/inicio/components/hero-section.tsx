import { Button } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Link from "next/link";

const HeroSection = () => {
  return (
    <Flex className="relative bg-primary w-full py-20 md:py-24 lg:py-0 lg:h-200 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-25 flex-col lg:flex-row items-center justify-between bg-[url('/landing-page/hero-section-background.webp')] bg-cover bg-center bg-no-repeat overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-transparent" />
      <Column className="relative z-10 w-full lg:w-140 space-y-6 md:space-y-8 lg:space-y-10">
        <Column className="space-y-4 md:space-y-5">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
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
      <div className="relative z-10 w-full lg:flex-shrink-0 h-64 sm:h-80 md:h-96 lg:h-150 lg:w-240 bg-black/60 rounded-md mt-8 lg:mt-0" />
    </Flex>
  );
};
export default HeroSection;
