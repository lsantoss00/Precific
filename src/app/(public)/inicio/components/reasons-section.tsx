import ReasonCard from "@/src/app/(public)/inicio/components/reason-card";
import Column from "@/src/components/core/column";
import { Brain, ChartColumn, FileSpreadsheet } from "lucide-react";

const ReasonsSection = () => {
  return (
    <Column
      id="descubra"
      className="bg-background w-full py-12 md:py-16 lg:py-20 lg:h-150 items-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-25"
    >
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-8 md:mb-12 lg:mb-16">
        Em poucos cliques, do custo ao lucro ideal
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full lg:max-w-5xl gap-8 h-full items-center">
        {reasonsMap?.map((reason, index) => (
          <ReasonCard key={index} reason={reason} />
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
