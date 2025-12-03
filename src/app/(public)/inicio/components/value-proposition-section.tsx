import { Button } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

const ValuePropositionSection = () => {
  return (
    <Row className="relative bg-primary w-full h-175 items-center justify-between bg-[url('/landing-page/hero-section-background.webp')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-transparent" />
      <Column className="relative z-10 space-y-20 w-1/2 px-25">
        <Column className="space-y-5">
          <h3 className="font-bold text-6xl text-white max-w-lg">
            Maior precisão, menos estresse!
          </h3>
          <p className="text-white text-lg">
            Com a nossa plataforma você não terá problemas para cadastrar um
            novo produto e descobrir o valor real de venda.
          </p>
          <Ellipsis className="text-white w-20 h-20 -my-5 -ml-2" />
        </Column>
        <Button
          asChild
          className="w-fit h-12 px-6 hover:cursor-pointer font-medium"
          variant="secondary"
        >
          <Link href="/entrar">Quero falar com um especialista!</Link>
        </Button>
      </Column>
      <div className="bg-black/60 h-full w-1/2 z-10" />
    </Row>
  );
};
export default ValuePropositionSection;
