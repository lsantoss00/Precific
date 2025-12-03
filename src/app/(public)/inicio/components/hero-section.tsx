import { Button } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Link from "next/link";

const HeroSection = () => {
  return (
    <Row className="relative bg-primary w-full h-200 px-25 items-center justify-between bg-[url('/landing-page/hero-section-background.webp')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-transparent" />
      <Column className="relative z-10 w-140 space-y-10">
        <Column className="space-y-5">
          <h1 className="font-bold text-6xl text-white">
            Precifique seus produtos com precisão.
          </h1>
          <p className="text-white text-lg">
            A Precific automatiza o cálculo de preços com base em custos,
            impostos e margens, simulando cenários futuros da Reforma
            Tributária.
          </p>
        </Column>
        <Button
          asChild
          className="w-fit h-12 px-6 hover:cursor-pointer font-medium"
          variant="secondary"
        >
          <Link href="/entrar">Agendar Demonstração</Link>
        </Button>
      </Column>
      <div className="bg-black/60 h-150 w-240 rounded-md z-10" />
    </Row>
  );
};
export default HeroSection;
