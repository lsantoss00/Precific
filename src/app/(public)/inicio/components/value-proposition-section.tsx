import { Button } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

const ValuePropositionSection = () => {
  return (
    <Flex className="relative bg-primary w-full py-12 md:py-16 xl:py-16 2xl:py-20 xl:h-[42rem] 2xl:h-175 flex-col xl:flex-row items-center justify-between bg-[url('/landing-page/hero-section-background.webp')] bg-cover bg-center bg-no-repeat overflow-hidden px-4 sm:px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-25">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-transparent" />
      <Flex className="flex-col lg:flex-row xl:flex-col relative z-10 space-y-8 md:space-y-12 xl:space-y-12 2xl:space-y-20 w-full xl:w-1/2">
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
          asChild
          className="w-full sm:w-fit h-12 md:h-14 px-6 md:px-8 hover:cursor-pointer font-medium text-sm md:text-base"
          variant="secondary"
        >
          <Link href="/entrar">Quero falar com um especialista!</Link>
        </Button>
      </Flex>
      <div className="relative z-10 w-full xl:w-1/2 h-64 sm:h-80 md:h-96 lg:h-110 xl:h-full bg-black/60 mt-8 xl:mt-0" />
    </Flex>
  );
};
export default ValuePropositionSection;
