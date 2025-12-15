import ReasonCard from "@/src/app/(landing)/components/reason-card";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import { Container } from "@/src/components/core";
import Column from "@/src/components/core/column";
import { Brain, ChartColumn, FileSpreadsheet } from "lucide-react";

const ReasonsSection = () => {
  return (
    <Container
      id="descubra"
      variant="section"
      className="pt-12 md:pt-16 xl:pt-16 2xl:pt-20 pb-12 md:pb-16 xl:pb-20 2xl:pb-24 bg-background"
    >
      <Column className="items-center">
        <FadeInOnScroll direction="up" offset={16}>
          <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl text-center mb-8 md:mb-12 xl:mb-12 2xl:mb-16">
            Em poucos cliques, do custo ao lucro ideal
          </h3>
        </FadeInOnScroll>
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full max-w-5xl gap-6">
          {reasonsMap?.map((reason, index) => (
            <ReasonCard key={index} reason={reason} delay={index * 0.15} />
          ))}
        </div>
      </Column>
    </Container>
  );
};

export default ReasonsSection;

const reasonsMap = [
  {
    icon: <FileSpreadsheet />,
    title: "Importe sua tabela de produtos",
    description:
      "Através do seu sistema, exporte seus produtos e insira-os na Precific.",
  },
  {
    icon: <Brain />,
    title: "A Precific faz os cálculos",
    description:
      "Nossa I.A realiza os cálculos para você! Seu único trabalho é fornecer os dados necessários.",
  },
  {
    icon: <ChartColumn />,
    title: "Exporte seus relatórios",
    description:
      "Veja o preço ideal para seus produtos e exporte em tabela para o acompanhamento.",
  },
];
