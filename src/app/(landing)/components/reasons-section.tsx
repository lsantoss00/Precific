import ReasonCard from "@/src/app/(landing)/components/reason-card";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import { Brain, ChartColumn, FileSpreadsheet } from "lucide-react";

const ReasonsSection = () => {
  return (
    <Column
      id="descubra"
      className="bg-background w-full py-12 md:py-16 xl:py-16 2xl:py-20 2xl:h-150 items-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-25"
    >
      <FadeInOnScroll direction="up" offset={16}>
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl text-center mb-8 md:mb-12 xl:mb-12 2xl:mb-16">
          Em poucos cliques, do custo ao lucro ideal
        </h2>
      </FadeInOnScroll>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full max-w-5xl gap-6">
        {reasonsMap?.map((reason, index) => (
          <ReasonCard key={index} reason={reason} delay={index * 0.15} />
        ))}
      </div>
    </Column>
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
