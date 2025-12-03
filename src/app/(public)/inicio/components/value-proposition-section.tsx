import { Button } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

const ValuePropositionSection = () => {
  return (
    <Flex className="relative bg-primary w-full py-12 md:py-16 lg:py-20 lg:h-175 flex-col lg:flex-row items-center justify-between bg-[url('/landing-page/hero-section-background.webp')] bg-cover bg-center bg-no-repeat overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-transparent" />
      <Column className="relative z-10 space-y-8 md:space-y-12 lg:space-y-20 w-full lg:w-1/2 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-25">
        <Column className="space-y-4 md:space-y-5">
          <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white max-w-lg leading-tight">
            Maior precisão, menos estresse!
          </h3>
          <p className="text-white text-base md:text-lg max-w-2xl">
            Com a nossa plataforma você não terá problemas para cadastrar um
            novo produto e descobrir o valor real de venda.
          </p>
          <Ellipsis className="text-white w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 -my-5 -ml-2" />
        </Column>
        <Button
          asChild
          className="w-full sm:w-fit h-12 md:h-14 px-6 md:px-8 hover:cursor-pointer font-medium text-sm md:text-base"
          variant="secondary"
        >
          <Link href="/entrar">Quero falar com um especialista!</Link>
        </Button>
      </Column>
      <div className="relative z-10 w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-full bg-black/60 mt-8 lg:mt-0 lg:mr-25" />
    </Flex>
  );
};
export default ValuePropositionSection;
